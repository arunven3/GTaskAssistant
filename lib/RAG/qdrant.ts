import { QdrantClient } from "@qdrant/js-client-rest";
import { TextEmbedder } from "@/lib/RAG/embedding";

export class Qdrant {
  private collection: string;
  private qdrant: QdrantClient;

  constructor(collection: string = "default_collection") {
    this.collection = collection;
    this.qdrant = new QdrantClient({ url: process.env.QDRANT_URL! });
  }

  private changeCollection(collection: string) {
    this.collection = collection;
  }

  private async CheckCollection(size: number) {
    await this.qdrant
      .createCollection(this.collection, {
        vectors: { size, distance: "Cosine" },
      })
      .catch(() => {});
  }

  public GetAllCollections = async () => this.qdrant.getCollections();

  public async addEmbedding(id: string, vector: number[], text: string) {
    console.log(vector.length);

    await this.CheckCollection(vector.length);

    await this.qdrant.upsert(this.collection, {
      points: [
        {
          id,
          vector,
          payload: { text },
        },
      ],
    });
  }

  public async deleteCollection(collection: string = this.collection) {
    await this.qdrant.deleteCollection(collection);
  }

  public searchEmbedding(query: number[], topK = 10) {
    return this.qdrant.search(this.collection, {
      vector: query,
      limit: topK,
    });
  }

  public async searchFromAllCollections(
    query: number[],
    topK = 10,
  ): Promise<string> {
    const { collections } = await this.GetAllCollections();
    let allResults = [];

    for (let collection of collections) {
      const results = await this.qdrant.search(collection.name, {
        vector: query,
        limit: topK,
        score_threshold: 0.6,
      });

      allResults.push(...results);
    }

    const sortedResults = allResults
      .sort((a, b) => b.score - a.score)
      .slice(0, 15);

    const data = sortedResults
      .map((result, i) => `${i + 1}. ${result.payload?.text}`)
      .join("\n\n");

    return data;
  }
}
