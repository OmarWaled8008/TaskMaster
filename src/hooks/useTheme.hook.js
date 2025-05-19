"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function useChangeTheme() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    checktheme();
  });
  function checktheme() {
    const defaultTheme = localStorage.getItem("mode");
    if (defaultTheme) {
      if (defaultTheme === "dark") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    } else {
      const darkModeSystem = window.matchMedia(
        "(prefers-color-scheme:dark)"
      ).matches;
      darkModeSystem ? setTheme("dark") : setTheme("light");
      localStorage.setItem("mode", darkModeSystem ? "dark" : "light");
    }
  }
  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("mode", "light");
    } else {
      setTheme("dark");
      localStorage.setItem("mode", "dark");
    }
  }

  return { theme, resolvedTheme, toggleTheme };
}
