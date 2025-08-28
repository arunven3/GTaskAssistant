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
}

main();
