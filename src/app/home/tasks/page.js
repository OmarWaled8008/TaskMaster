import React from "react";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import TaskCard from "@/components/TaskCard";
import { auth } from "@/auth";

export default async function Tasks() {
  const session = await auth();
  const userid = session.user.id;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/tasks/${userid}`,
    {
      cache: "no-store",
    }
  );
  const tasks = await res.json();
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 border-b-2 border-accent-700">
        <h1 className="text-2xl">Tasks</h1>
        <Link href="/home/tasks/new" className="flex px-4 py-2 text-primary ">
          <PlusCircleIcon className="h-6 w-6 mr-2 text-primary" />
          Add New Task
        </Link>
      </div>
      <ul className="space-y-2">
        {tasks.map((task, idx) => (
          <TaskCard key={idx} task={task} />
        ))}
      </ul>
    </div>
  );
}
