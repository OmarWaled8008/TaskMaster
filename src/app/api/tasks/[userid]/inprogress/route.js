import tasks from "@/data/task.json";
import fs from "fs/promises";
import path from "path";

const taskPath = path.join(process.cwd(), "src", "data", "task.json");
async function writeTasks(tasks) {
  await fs.writeFile(taskPath, JSON.stringify(tasks), "utf-8");
}

export async function GET(request, { params }) {
  const awaitedParams = await params;
  const { userid } = awaitedParams;
  const userTasks = tasks.filter((task) => {
    return task.userId === Number(userid) && task.status === "in progress";
  });
  return new Response(JSON.stringify(userTasks));
}

export async function PATCH(request, { params }) {
  const awaitedParams = await params;
  const { userid } = awaitedParams;
  const body = await request.json();
  const { id } = body;

  const userTask = tasks.find((task) => {
    return id === task.id;
  });
  userTask.status = "in progress";
  tasks.splice(
    tasks.findIndex((task) => task.id === Number(id)),
    1,
    userTask
  );
  await writeTasks(tasks);
  return new Response({ message: "Task completed successfully" });
}
