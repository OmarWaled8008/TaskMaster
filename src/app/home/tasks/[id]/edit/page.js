"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EditTask() {
  const { data, status } = useSession();
  const userid = data?.user?.id;
  const router = useRouter();
  const params = useParams();
  const taskId = params?.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId || !userid) return;

    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${userid}/${taskId}`);
        if (!res.ok) throw new Error("Failed to fetch task");

        const task = await res.json();
        setTitle(typeof task.title === "string" ? task.title : "");
        setDescription(
          typeof task.description === "string" ? task.description : ""
        );
      } catch (err) {
        setMessage("Failed to load task.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, userid]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/tasks/${userid}/task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId, title, description }),
      });

      if (res.ok) {
        setMessage("Task updated!");
        router.push("/home/tasks");
      } else {
        const data = await res.json();
        setMessage(data.error || "Update failed.");
      }
    } catch {
      setMessage("Something went wrong.");
    }
  };

  if (loading) return <p className="text-center text-secondary">Loading...</p>;

  return (
    <div className="bg-card p-6 rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Edit Task #{taskId}
      </h2>
      <form className="space-y-4" onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Updated Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded bg-transparent text-text placeholder:text-secondary"
        />
        <textarea
          placeholder="Updated Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded bg-transparent text-text placeholder:text-secondary"
        />
        <button
          type="submit"
          className="bg-primary text-card px-4 py-2 rounded hover:opacity-90"
        >
          Update
        </button>
        {message && <p className="text-sm text-secondary mt-2">{message}</p>}
      </form>
    </div>
  );
}
