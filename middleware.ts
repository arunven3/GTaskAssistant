import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./lib/Auth/check";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const ok = await isAuthenticated(req);

    if (!ok) {
      const url = new URL("/sign-in", req.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
