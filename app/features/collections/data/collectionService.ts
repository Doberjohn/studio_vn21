import { prisma } from "~/shared/db/prisma";
import type { Collection } from "~/shared/types/collection";

export async function getAllCollections(): Promise<Collection[]> {
  const collections = await prisma.collection.findMany({
    include: {
      stories: true
    },
    orderBy: { name: "asc" }
  });

  return collections.map((collection) => ({
    id: collection.id,
    name: collection.name,
    isVisible: collection.isVisible,
    storyCount: collection.stories.length
  }));
}

export async function getCollectionById(
  id: string
): Promise<Collection | null> {
  const collection = await prisma.collection.findUnique({
    where: { id },
    include: {
      stories: true
    }
  });

  if (!collection) return null;

  return {
    id: collection.id,
    name: collection.name,
    isVisible: collection.isVisible,
    storyCount: collection.stories.length
  };
}
