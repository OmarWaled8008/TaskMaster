"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Themebtn from "@/components/themebtn";
import Image from "next/image";

export default function RegisterPage() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!user.name.trim()) return "Name is required";
    if (!user.email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) return "Email is invalid";
    if (user.password.length < 6)
      return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to register");
        setLoading(false);
        return;
      }
      await signIn("credentials", {
        redirect: true,
        email: user.email,
        password: user.password,
        callbackUrl: "/",
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative min-h-screen img-bg text-text p-6 space-y-6">
      <div className="absolute top-4 right-4 z-2 bg-background rounded-full p-1">
        <Themebtn />
      </div>
      <div className="bg-accent-800 opacity-75 absolute top-0 left-0 w-full h-full z-1"></div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-background text-text p-6 rounded-2xl z-2 shadow-2xl"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-primary">
          Create Account
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg bg-transparent text-text placeholder:text-secondary"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg bg-transparent text-text placeholder:text-secondary"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg bg-transparent text-text placeholder:text-secondary"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-primary text-card py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>
        <p className="mt-4 text-center text-sm text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="underline text-primary">
            Log in
          </Link>
        </p>
      </form>
      <div className="flex flex-col w-1/4 z-2">
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="px-6 flex justify-center items-center cursor-pointer py-2 mb-5 outline-1 outline-primary w-full rounded-lg hover:bg-primary transition"
        >
          <Image
            className="mr-3"
            src="/google.png"
            alt="google"
            width={30}
            height={30}
          />
          Google
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="px-6 flex justify-center items-center cursor-pointer py-2 mb-5 outline-1 outline-primary w-full rounded-lg hover:bg-primary transition"
        >
          <Image
            className="mr-3"
            src="/github.png"
            alt="github"
            width={30}
            height={30}
          />
          GitHub
        </button>
      </div>
    </div>
  );
}
