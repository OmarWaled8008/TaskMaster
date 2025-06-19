import { auth } from "@/auth";
import TasksClient from "@/components/TasksClient";

export default async function Tasks() {
  const session = await auth();
  const userId = session.user.id;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/tasks/${userId}`,
    {
      cache: "no-store",
    }
  );
  const tasks = await res.json();

  return <TasksClient initialTasks={tasks} userId={userId} page={"All"} />;
}
