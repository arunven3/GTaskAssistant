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

  private async addEmbedding(id: string, vector: number[], text: string) {
    console.log(vector.length);

    await this.CheckCollection(vector.length);

    console.log("debug data", {
      id,
      vector,
      payload: { text },
    });

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

  public async embedAndStore(id: string, text: string) {
    const embedding = await TextEmbedder.getEmbeding(text);
    await this.addEmbedding(id, embedding, text);
  }

  private searchEmbedding(query: number[], topK = 10) {
    return this.qdrant.search(this.collection, {
      vector: query,
      limit: topK,
    });
  }
}
