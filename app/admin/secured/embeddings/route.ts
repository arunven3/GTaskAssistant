import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
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

    try {
      await fs.promises.writeFile(filePath, buffer);
      const data = await pdfParse(buffer);
      // console.log(data.text);

      return NextResponse.json({ message: "File uploaded successfully." });
    } catch (error) {
      console.log(error);
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
