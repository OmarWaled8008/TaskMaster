import { NextResponse } from "next/server";

export async function middleware(request) {
  const session = request.cookies.get("__Secure-authjs.session-token")?.value;
  console.log("Session Token:", session);
  const protectedPaths = [
    "/home",
    "/home/tasks",
    "/home/profile",
    "/home/tasks/completed",
    "/home/tasks/inprogress",
    "/home/tasks/pending",
  ];
  const isProtected = protectedPaths.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/home/:path*"],
};
