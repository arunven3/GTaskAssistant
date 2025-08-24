import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/Auth/auth";

export async function POST() {
  clearAuthCookie();
  return NextResponse.json({ ok: true });
}
