"use client";
import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

export default function Themebtn() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !resolvedTheme) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className=" text-card p-2 rounded-full hover:opacity-90 transition cursor-pointer"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-6 w-6 text-toggle-theme" />
      ) : (
        <MoonIcon className="h-6 w-6 text-toggle-theme" />
      )}
    </button>
  );
}
