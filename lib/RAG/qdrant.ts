import { QdrantClient } from "@qdrant/js-client-rest";

export class Qdrant {
  private collection: string;
  private qdrant: QdrantClient;

  constructor() {
    this.collection = "DOCS";
    this.qdrant = new QdrantClient({ url: process.env.QDRANT_URL! });
  }

  private changeCollection(collection: string) {
    this.collection = collection;
  }

  private async CheckCollection() {
    await this.qdrant
      .createCollection(this.collection, {
        vectors: { size: 768, distance: "Cosine" },
      })
      .catch(() => {});
  }

  private async addEmbedding(id: string, vector: number[], text: string) {
    await this.CheckCollection();
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

  private searchEmbedding(query: number[], topK = 10) {
    return this.qdrant.search(this.collection, {
      vector: query,
      limit: topK,
    });
  }
}
