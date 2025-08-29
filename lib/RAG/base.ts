import { TextEmbedder } from "./embedding";
import { Qdrant } from "./qdrant";

export const getAllMatchingChunks = async (query: string) => {
  const vectorData = await TextEmbedder.getEmbeding(query);
  const qdrantClient = new Qdrant();

  return qdrantClient.searchFromAllCollections(vectorData);
};

export const getMatchingChunks = async (query: string, collection: string) => {
  const vectorData = await TextEmbedder.getEmbeding(query);
  const qdrantClient = new Qdrant(collection);
  return qdrantClient.searchEmbedding(vectorData);
};

export const embedAndStore = async (
  collectionName: string,
  id: string,
  text: string,
) => {
  const embedding = await TextEmbedder.getEmbeding(text);
  const qdrantClient = new Qdrant(collectionName);
  return await qdrantClient.addEmbedding(id, embedding, text);
};
