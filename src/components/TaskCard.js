"use client";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  CircleDotDashed,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TaskCard({ task }) {
  return (
    <div>
      <li
        key={task.id}
        className=" p-4 rounded grid md:grid-cols-3 my-5 grid-cols-1 border-l-10 border-l-accent-600 shadow-md shadow-black/40  "
      >
        <h3 className=" text-second-100 text-center md:text-left">
          {task.title}
        </h3>
        <p className="text-gray-500 text-center my-3 md:m-0">{task.status}</p>
        <div className="flex md:justify-end justify-center gap-4">
          <button className="cursor-pointer">
            {task.status === "completed" ? (
              <CheckCircleIcon className="h-6 w-6 text-green-500 transition-all" />
            ) : (
              <CheckCircleIcon className="h-6 w-6 text-gray-500 hover:text-green-500 transition-all" />
            )}
          </button>
          <button className="cursor-pointer">
            {task.status === "pending" ? (
              <CircleDotDashed className="h-6 w-6 text-primary transition-all" />
            ) : (
              <CircleDotDashed className="h-6 w-6 text-gray-500 hover:text-primary transition-all" />
            )}
          </button>
          <Link href={`/home/tasks/${task.id}/edit`}>
            <PencilSquareIcon className="h-6 w-6  text-gray-500 hover:text-primary transition-all" />
          </Link>
          <button className="cursor-pointer">
            <TrashIcon className="h-6 w-6 text-gray-500 hover:text-red-500 transition-all" />
          </button>
          <Link href={`/home/tasks/${task.id}`}>
            <ChevronRightIcon className="h-6 w-6  text-gray-500 hover:text-primary transition-all" />
          </Link>
        </div>
      </li>
    </div>
  );
}
