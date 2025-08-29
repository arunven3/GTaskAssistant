import { pipeline, env } from "@xenova/transformers";

export class TextEmbedder {
  private static instance: any;

  private static async getInstance() {
    if (!TextEmbedder.instance) {
      env.cacheDir = "./models";

      TextEmbedder.instance = await pipeline(
        "feature-extraction",
        "Snowflake/snowflake-arctic-embed-m-v2.0",
        {
          quantized: true,
          local_files_only: true,
        },
      );
    }
    return TextEmbedder.instance;
  }

  public static async getEmbeding(text: string): Promise<number[]> {
    const embedder = await TextEmbedder.getInstance();
    const output = await embedder(text, { pooling: "mean", normalize: true });
    return Array.from(output.data);
  }
}

export const splitTextByWords = (text: string, maxLength = 1950): string[] => {
  const words = text.split(/\s+/); // split by whitespace
  const chunks: string[] = [];
  let current = "";

  for (const word of words) {
    if ((current + " " + word).trim().length > maxLength) {
      chunks.push(current.trim());
      current = word; // start new chunk
    } else {
      current += (current ? " " : "") + word;
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
};
