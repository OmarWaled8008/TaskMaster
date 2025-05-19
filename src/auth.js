import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "./data/users.json";
import fs from "fs/promises";
import path from "path";
const userFilePath = path.join(process.cwd(), "src", "data", "users.json");
async function readUsers() {
  const data = await fs.readFile(userFilePath, "utf-8");
  return JSON.parse(data);
}
async function writeUsers(users) {
  await fs.writeFile(userFilePath, JSON.stringify(users), "utf-8");
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const passTrue = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );
        if (!passTrue) {
          throw new Error("Invalid credentials.");
        }
        return passTrue;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      const usersData = await readUsers();

      let existingUser = usersData.find((u) => u.email === user.email);

      if (!existingUser) {
        const newUser = {
          id: usersData.length ? usersData[usersData.length - 1].id + 1 : 1,
          name: user.name || user.email.split("@")[0] || "User",
          email: user.email,
          password: "",
        };
        usersData.push(newUser);
        await writeUsers(usersData);
        existingUser = newUser;
      }
      return existingUser;
    },

    async jwt({ token, user }) {
      if (user) {
        const usersData = await readUsers();
        const matchedUser = usersData.find((u) => u.email === user.email);
        if (matchedUser) {
          token.id = matchedUser.id;
          token.email = matchedUser.email;
          token.name = matchedUser.name;
        } else {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
