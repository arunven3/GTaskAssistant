import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { embedAndStore } from "@/lib/RAG/base";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import { randomUUID } from "crypto";
import { splitTextByWords } from "@/lib/RAG/embedding";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { base64Data, fileName } = await req.json();

    if (!base64Data) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    let base64DataClean = base64Data;

    if (base64Data.startsWith("data:")) {
      base64DataClean = base64Data.split(",")[1];
    }

    const buffer = Buffer.from(base64DataClean, "base64");
    const folderPath = path.join(process.cwd(), "uploads");
    let filePath = path.join(folderPath, fileName);

    if (fs.existsSync(filePath)) {
      filePath = path.join(
        folderPath,
        `${path.basename(fileName)}-${Date.now()}_${path.extname(fileName)}`,
      );
    }

    await fs.promises.writeFile(filePath, buffer);
    const data = await pdfParse(buffer);
    const text = data.text;
    const stats = await fs.promises.stat(filePath);
    const size = (stats.size / 1024).toFixed(2);

    const sanitizedName = fileName
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();

    const FileId = randomUUID();

    await prisma.chunkingFiles.create({
      data: {
        id: FileId,
        filename: fileName,
        path: filePath,
        size: size.toString(),
        sanitizedName,
      },
    });

    const wordChunks = splitTextByWords(text);

    for (let wordChunk of wordChunks) {
      await embedAndStore(sanitizedName, FileId, wordChunk);
    }

    return NextResponse.json({ message: "File uploaded successfully." });
  } catch (e: any) {
    console.error(e);
    console.log(e);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
