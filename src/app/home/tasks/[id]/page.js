"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TaskDetails() {
  const params = useParams();
  const { data } = useSession();
  const userid = data?.user?.id;
  const taskid = params?.id; 

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userid || !taskid) return;

    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${userid}/${taskid}`);
        if (!res.ok) throw new Error("Failed to fetch task");
        const data = await res.json();
        setTask(data[0] || null);
      } catch (error) {
        console.error("Fetch error:", error);
        setTask(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [userid, taskid]);

  if (loading) return <p className="text-secondary">Loading...</p>;
  if (!task) return <p className="text-red-500">Task not found.</p>;

  return (
    <div className="bg-card p-6 rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">{task.title}</h2>
      <p className="text-secondary mb-2">{task.description}</p>
      <p className="text-sm text-muted">
        <span className="font-semibold">Status:</span> {task.status}
      </p>
    </div>
  );
}
