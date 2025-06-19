"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function New() {
  const { data, status } = useSession();
  const userid = data?.user.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (!userid) {
      setMessage("You must be logged in to create a task.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          status: "in progress",
          userId: userid,
        }),
      });

      if (res.ok) {
        setMessage("Task created successfully!");
        setTitle("");
        setDescription("");
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to create task.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg text-text p-4 sm:p-6">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8 border border-secondary/30">
        <h2 className="text-2xl font-extrabold mb-6 text-primary flex items-center gap-2">
          <span className="text-3xl">➕</span> Add New Task
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-secondary/40 rounded-lg bg-transparent text-text placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />
          <textarea
            placeholder="Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-secondary/40 rounded-lg bg-transparent text-text placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-card font-semibold px-4 py-3 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>

          {message && (
            <p className="text-sm mt-2 text-center text-secondary">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
