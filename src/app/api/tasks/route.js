import tasks from "../../../data/task.json";
import fs from "fs/promises";
import path from "path";

const taskPath = path.join(process.cwd(), "src", "data", "task.json");

async function writeTasks(tasks) {
  await fs.writeFile(taskPath, JSON.stringify(tasks), "utf-8");
}

export async function POST(req) {
  const body = await req.json();
  const { title, description, status, userId } = body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status,
    userId,
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  return new Response(
    { message: "Task created successfully!" },
    { status: 201 }
  );
}
