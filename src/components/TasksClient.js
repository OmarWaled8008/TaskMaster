"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import TaskCard from "./TaskCard";
import { useRouter } from "next/navigation";

export default function TasksClient({ initialTasks, userId , page}) {
  const [tasks, setTasks] = useState(initialTasks);
  const router = useRouter();

  const fetchTasks = async () => {
    const res = await fetch(`/api/tasks/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const data = await res.json();
    setTasks(data);
  };

  const handleDelete = async (taskId) => {
    const res = await fetch(`/api/tasks/${userId}/task`, {
      method: "DELETE",
      body: JSON.stringify({ id: taskId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      fetchTasks();
    } else {
      console.error("Failed to delete task");
    }
  };

  const handleComplete = async (taskId) => {
    const res = await fetch(`/api/tasks/${userId}/completed`, {
      method: "PATCH",
      body: JSON.stringify({ id: taskId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      fetchTasks();
      router.push("/home/tasks/completed");
    } else {
      console.error("Failed to complete task");
    }
  };

  const handlePending = async (taskId) => {
    const res = await fetch(`/api/tasks/${userId}/pending`, {
      method: "PATCH",
      body: JSON.stringify({ id: taskId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      fetchTasks();
      router.push("/home/tasks/pending");
    } else {
      console.error("Failed to set task as pending");
    }
  };

  const handleInProgress = async (taskId) => {
    const res = await fetch(`/api/tasks/${userId}/inprogress`, {
      method: "PATCH",
      body: JSON.stringify({ id: taskId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      fetchTasks();
      router.push("/home/tasks/inprogress");
    } else {
      console.error("Failed to set task as in progress");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 border-b-2 border-accent-700">
        <h1 className="text-2xl">{page} - Tasks</h1>
  s      <Link href="/home/tasks/new" className="flex px-4 py-2 text-primary ">
          <PlusCircleIcon className="h-6 w-6 mr-2 text-primary" />
          Add New Task
        </Link>
      </div>
      <ul className="space-y-2">
        {tasks.map((task, idx) => (
          <TaskCard
            key={idx}
            task={task}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onPending={handlePending}
            onInProgress={handleInProgress}
          />
        ))}
      </ul>
    </div>
  );
}
