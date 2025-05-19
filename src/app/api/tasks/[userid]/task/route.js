import tasks from "@/data/task.json";
import fs from "fs/promises";
import path from "path";

const taskPath = path.join(process.cwd(), "src", "data", "task.json");

async function writeTasks(tasks) {
  await fs.writeFile(taskPath, JSON.stringify(tasks), "utf-8");
}

export async function PUT(req) {
  const { id, title, description, status } = await req.json();
  console.log(id);
  const task = tasks.find((task) => task.id === Number(id));

  if (!task) {
    return new Response("Task not found", { status: 404 });
  }

  task.title = title;
  task.description = description;
  if (status !== undefined) task.status = status;
  tasks.splice(
    tasks.findIndex((task) => task.id === Number(id)),
    1,
    task
  );
  await writeTasks(tasks);
  return new Response(JSON.stringify(task));
}

export async function DELETE(req) {
  const { id } = await req.json();
  const taskIndex = tasks.findIndex((task) => task.id === Number(id));
  if (taskIndex === -1) {
    return new Response("Task not found", { status: 404 });
  }
  tasks.splice(taskIndex, 1);
  await writeTasks(tasks);
  return new Response("Task deleted successfully");
}
