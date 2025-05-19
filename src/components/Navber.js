import Link from "next/link";
import React from "react";
import Themebtn from "./themebtn";
import {
  ArrowUpIcon,
  BriefcaseIcon,
  CheckIcon,
  ClockIcon,
  DocumentPlusIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function Navbar({ handleClick }) {
  return (
    <>
      <aside className="w-64 items-center p-4 bg-accent-800 relative">
        <button
          onClick={() => handleClick()}
          className="absolute top-4 right-1 z-50 p-2 rounded-full "
        >
          <XCircleIcon className="h-6 w-6 text-primary " />
        </button>
        <h1 className="text-xl font-bold mb-6 ">To-Do App</h1>
        <nav className="flex flex-col gap-4">
          <Link
            href="/home/tasks"
            className="flex items-center gap-2 text-accent-900 hover:bg-accent-700 p-2 rounded-md transition-colors duration-200"
          >
            <BriefcaseIcon className="h-6 w-6 text-primary" />
            All Tasks
          </Link>

          <Link
            href="/home/tasks/new"
            className="flex items-center gap-2 text-accent-900 hover:bg-accent-700 p-2 rounded-md transition-colors duration-200"
          >
            <DocumentPlusIcon className="h-6 w-6 text-primary" />
            New Task
          </Link>

          <Link
            href="/home/tasks/pending"
            className="flex items-center gap-2 text-accent-900 hover:bg-accent-700 p-2 rounded-md transition-colors duration-200"
          >
            <ClockIcon className="h-6 w-6 text-primary" />
            Pending
          </Link>

          <Link
            href="/home/tasks/inprogress"
            className="flex items-center gap-2 text-accent-900 hover:bg-accent-700 p-2 rounded-md transition-colors duration-200"
          >
            <ArrowUpIcon className="h-6 w-6 text-primary" />
            In Progress
          </Link>

          <Link
            href="/home/tasks/completed"
            className="flex items-center gap-2 text-accent-900 hover:bg-accent-700 p-2 rounded-md transition-colors duration-200"
          >
            <CheckIcon className="h-6 w-6 text-primary" />
            Completed
          </Link>

          <Link
            href="/home/profile"
            className="flex items-center gap-2 text-accent-900 hover:bg-accent-700 p-2 rounded-md transition-colors duration-200"
          >
            <UserIcon className="h-6 w-6 text-primary" />
            Profile
          </Link>
          <Themebtn />
        </nav>
      </aside>
    </>
  );
}
