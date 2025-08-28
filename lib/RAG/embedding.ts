import { pipeline } from "@xenova/transformers";

export class TextEmbedder {
  private static instance: any;

  private static async getInstance() {
    if (!TextEmbedder.instance) {
      TextEmbedder.instance = await pipeline(
        "feature-extraction",
        "./models/snowflake-arctic-embed-m-v2.0",
        {
          quantized: true,
          local_files_only: true,
        },
      );
    }
    return TextEmbedder.instance;
  }

  // Public method to embed text
  public static async embed(text: string): Promise<number[]> {
    const embedder = await TextEmbedder.getInstance();
    const output = await embedder(text, { pooling: "mean", normalize: true });
    return Array.from(output.data);
  }
}
