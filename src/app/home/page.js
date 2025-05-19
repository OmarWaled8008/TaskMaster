import { auth } from "../../auth";
import { ArrowRight, CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Themebtn from "@/components/themebtn";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col ">
      <header className="   border-b border-accent-700">
        <div className="container mx-auto flex items-center px-4 lg:px-6 h-14">
          <Link href="/" className="flex items-center justify-center">
            <span className="font-bold text-xl text-primary">TaskMaster</span>
          </Link>
          <nav className="ml-auto flex gap-2 sm:gap-5">
            <Themebtn />

            {session ? (
              <Link
                className="text-sm font-medium px-3 py-2 "
                href="/home/profile"
              >
                <CircleUserRound className="h-6 w-6 text-toggle-theme" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium px-3 py-2 rounded-md outline-1 outline-primary hover:outline-0 hover:bg-primary transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium bg-primary px-3 py-2 hover:bg-transparent hover:outline-1 hover:outline-primary rounded-md transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4 ">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage your tasks with ease
                  </h1>
                  <p className="max-w-[600px] mt-3 text-muted-foreground md:text-xl text-primary">
                    TaskMaster helps you organize your work, track progress, and
                    achieve your goals.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/home/tasks">
                    <button className="gap-1.5 flex items-center bg-primary cursor-pointer hover:bg-transparent hover:outline-1 hover:outline-primary transition-colors duration-200 rounded-md px-4 py-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                  {!session ? (
                    <Link href="/login">
                      <button className="gap-1.5 flex items-center  cursor-pointer  outline-1 outline-primary hover:bg-primary hover:outline-0 transition-colors duration-200 rounded-md px-4 py-2">
                        Login
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  alt="Task Management"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="/photo-1692158962119-8103c7d78c86.avif"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-xs text-muted-foreground">
          © 2024 TaskMaster. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
