import { NextRequest, NextResponse } from "next/server";
import { Qdrant } from "@/lib/RAG/qdrant";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: NextRequest) {
  try {
    const name = request.nextUrl.searchParams.get("name");

    if (!name) {
      return NextResponse.json(
        { error: "Collection name is required" },
        { status: 400 },
      );
    }

    const chunkingFiles = await prisma.chunkingFiles.findMany({
      where: { id: name },
    });

    const QdrantClient = new Qdrant(name);

    for (let file of await chunkingFiles) {
      QdrantClient.deleteCollection(file.sanitizedName);
      await prisma.chunkingFiles.delete({ where: { id: file.id } });
    }

    return NextResponse.json({ success: true, deleted: name });
  } catch (err: any) {
    console.error("[DELETE /collections]", err);
    return NextResponse.json(
      { error: err?.message || "Failed to delete collection" },
      { status: 500 },
    );
  }
}
