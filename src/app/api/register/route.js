import users from "@/data/users.json";
import fs from "fs/promises";
import path from "path";

const userPath = path.join(process.cwd(), "src", "data", "users.json");
async function readUsers() {
  const data = await fs.readFile(userPath, "utf-8");
  return JSON.parse(data);
}
async function writeUsers(users) {
  await fs.writeFile(userPath, JSON.stringify(users), "utf-8");
}

export async function POST(req) {
  const body = await req.json();
  const users = await readUsers();
  const passTrue = users.find(
    (user) => user.email === body.email && user.password === body.password
  );
  if (passTrue) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 400,
    });
  }
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: body.name,
    email: body.email,
    password: body.password,
  };
  users.push(newUser);
  await writeUsers(users);
  return new Response(JSON.stringify({ message: "Login successful" }));
}
