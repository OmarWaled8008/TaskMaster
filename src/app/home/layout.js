"use client";
import { Bars4Icon } from "@heroicons/react/24/outline";
import Navbar from "../../components/Navber";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function HomeLayout({ children }) {
  const [shownav, setShownav] = useState(false);
  useEffect(() => {
    const navhere = localStorage.getItem("shownav");
    if (navhere === "true") {
      setShownav(true);
    } else {
      setShownav(false);
    }
  }, []);
  function handleClick() {
    localStorage.setItem("shownav", !shownav);
    setShownav(!shownav);
  }

  return (
    <div className="flex w-full min-h-screen ">
      {shownav ? (
        <Navbar handleClick={handleClick} />
      ) : (
        <button
          onClick={() => handleClick()}
          className="fixed top-4 left-4 z-50 p-2 bg-primary text-card rounded-full shadow-lg"
        >
          <Bars4Icon className="h-6 w-6" />
        </button>
      )}
      <main className="w-full">
        <SessionProvider>{children}</SessionProvider>
      </main>
    </div>
  );
}
