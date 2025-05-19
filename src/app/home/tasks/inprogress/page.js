import React from "react";
import { auth } from "@/auth";
import TasksClient from "@/components/TasksClient";

export default async function Inprogress() {
  const session = await auth();
  const userId = session.user.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/tasks/${userId}/inprogress`,
    {
      cache: "no-store",
    }
  );
  const tasks = await res.json();

  return <TasksClient initialTasks={tasks} userId={userId} page={"In Progress"} />;
}
