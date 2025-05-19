"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Themebtn from "@/components/themebtn";
import Image from "next/image";

export default function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user.email || !user.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/");
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
          Welcome Back
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-transparent text-text placeholder:text-secondary"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-transparent text-text placeholder:text-secondary"
            required
          />
        </div>

        {error && (
          <p className="mt-2 text-center text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-primary cursor-pointer text-card py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="mt-4 text-center text-sm text-secondary">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline text-primary">
            Sign up
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
