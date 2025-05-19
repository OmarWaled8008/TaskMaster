"use client";
import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  CircleDotDashed,
  Loader,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";

export default function TaskCard({
  task,
  onDelete,
  onComplete,
  onPending,
  onInProgress,
}) {
  return (
    <li className="p-4 rounded grid md:grid-cols-3 my-5 grid-cols-1 border-l-10 border-l-accent-600 shadow-md shadow-black/40">
      <h3 className="text-second-100 text-center md:text-left">{task.title}</h3>
      <p className="text-gray-500 text-center my-3 md:m-0">{task.status}</p>
      <div className="flex md:justify-end justify-center gap-4">
        <button className="cursor-pointer" onClick={() => onComplete(task.id)}>
          <CheckCircleIcon
            className={`h-6 w-6 ${
              task.status === "completed"
                ? "text-green-500"
                : "text-gray-500 hover:text-green-500"
            } transition-all`}
          />
        </button>
        <button className="cursor-pointer" onClick={() => onPending(task.id)}>
          <CircleDotDashed
            className={`h-6 w-6 ${
              task.status === "pending"
                ? "text-primary"
                : "text-gray-500 hover:text-primary"
            } transition-all`}
          />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => onInProgress(task.id)}
        >
          <Loader
            className={`h-6 w-6 ${
              task.status === "in progress"
                ? "text-yellow-500"
                : "text-gray-500 hover:text-yellow-500"
            } transition-all`}
          />
        </button>
        <Link href={`/home/tasks/${task.id}/edit`}>
          <PencilSquareIcon className="h-6 w-6 text-gray-500 hover:text-primary transition-all" />
        </Link>
        <button onClick={() => onDelete(task.id)} className="cursor-pointer">
          <TrashIcon className="h-6 w-6 text-gray-500 hover:text-red-500 transition-all" />
        </button>
        <Link href={`/home/tasks/${task.id}`}>
          <ChevronRightIcon className="h-6 w-6 text-gray-500 hover:text-primary transition-all" />
        </Link>
      </div>
    </li>
  );
}
