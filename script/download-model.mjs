import { pipeline, env } from "@xenova/transformers";

env.cacheDir = "./models";

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
  const modelsDir = path.join(process.cwd(), "models");
  const filePath = path.join(modelsDir, "Qwen3-1.7B-Q6_K.gguf");

  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
  }

  const file = fs.createWriteStream(filePath);
  https
    .get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log("Model downloaded to:", filePath);
      });
    })
    .on("error", (err) => {
      fs.unlink(filePath, () => {}); // Delete partial file on error
      console.error("Download failed:", err.message);
    });

  console.log("Qwen3-1.7B Model downloaded sucesfully");

  const llamaDir = path.join(process.cwd(), "llama.cpp");
  if (!fs.existsSync(llamaDir)) {
    console.log("Cloning llama.cpp...");
    execSync(
      `git clone https://github.com/ggerganov/llama.cpp.git ${llamaDir}`,
      { stdio: "inherit" },
    );
  }

  console.log("Building llama.cpp...");
  execSync(`make -C ${llamaDir}`, { stdio: "inherit" });

  (async () => {
    await downloadFile(modelUrl, modelPath);

    console.log("Model and llama.cpp ready!");
  })();
}

main();
