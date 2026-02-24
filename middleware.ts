import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, isAdminAuthenticated } from "./lib/Auth/check";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!(await isAdminAuthenticated(req))) {
      const url = new URL("/admin/login", req.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (!(await isAuthenticated(req))) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/chat/:path*",
    "/admin/secured/:path*",
    "/api/chat/:path",
  ],
};
