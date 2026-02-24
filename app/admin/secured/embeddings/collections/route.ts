import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    return NextResponse.json(await prisma.chunkingFiles.findMany());
  } catch (err: any) {
    console.error("[GET /collections]", err);
    return NextResponse.json(
      { error: err?.message || "Failed to list collections" },
      { status: 500 },
    );
  }
}
