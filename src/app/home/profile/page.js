"use client";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg text-text p-6">
      <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-md text-center border border-secondary">
        <h2 className="text-2xl font-bold mb-2 text-primary">👤 user.name</h2>
        <p className="text-secondary mb-6">user.email</p>

        <div className="grid grid-cols-3 gap-4 text-sm text-left">
          <div className="bg-bg p-3 rounded-lg border border-secondary">
            <h4 className="font-bold text-primary">📋 Total</h4>
            <p>{tasks.length}</p>
          </div>
          <div className="bg-bg p-3 rounded-lg border border-secondary">
            <h4 className="font-bold text-primary">✅ Completed</h4>
            <p>completed</p>
          </div>
          <div className="bg-bg p-3 rounded-lg border border-secondary">
            <h4 className="font-bold text-primary">🚧 In Progress</h4>
            <p>inProgress</p>
          </div>
          <div className="bg-bg p-3 rounded-lg border border-secondary col-span-3">
            <h4 className="font-bold text-primary">🕒 Pending</h4>
            <p>pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}
