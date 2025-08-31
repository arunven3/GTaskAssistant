import { pipeline, env } from "@xenova/transformers";
import https from "https";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { writeFile } from "fs/promises";

env.cacheDir = "./resources/models";

async function main() {
  console.log("Downloading Snowflake Arctic Embed model...");

  await pipeline(
    "feature-extraction",
    "Snowflake/snowflake-arctic-embed-m-v2.0",
    {
      quantized: true,
    },
  );

  console.log("snowflake-arctic-embed-m-v2.0 Model downloaded sucesfully");

  const url =
    "https://huggingface.co/unsloth/Qwen3-1.7B-GGUF/resolve/main/Qwen3-1.7B-Q6_K.gguf?download=true";
  const modelsDir = path.join(process.cwd(), "resources", "models");
  const filePath = path.join(modelsDir, "Qwen3-1.7B-Q6_K.gguf");

  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  await writeFile(filePath, Buffer.from(buffer));
  console.log("Model downloaded to:", filePath);
}

main();
