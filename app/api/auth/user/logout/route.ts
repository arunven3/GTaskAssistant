import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/Auth/auth";

export async function POST() {
  clearAuthCookie("client");
  return NextResponse.json({ ok: true });
}
