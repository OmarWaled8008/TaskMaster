import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/pgConnection";
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
        const { email, password } = credentials;

        const result = await pool.query(
          "SELECT * FROM users WHERE email = $1 AND password = $2",
          [email, password]
        );

        if (result.rows.length === 0) {
          throw new Error("Invalid credentials.");
        }

        return result.rows[0];
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        user.email,
      ]);

      let existingUser = result.rows[0];

      if (!existingUser) {
        const insertResult = await pool.query(
          "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
          [user.name || user.email.split("@")[0] || "User", user.email, ""]
        );
        existingUser = insertResult.rows[0];
      }

      return existingUser;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
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
