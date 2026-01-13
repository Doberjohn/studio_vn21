import { prisma } from "~/shared/db/prisma";
import type { Collection } from "~/shared/types/collection";

export interface CreateCollectionInput {
  name: string;
  isVisible?: boolean;
}

export interface UpdateCollectionInput {
  id: string;
  name?: string;
  isVisible?: boolean;
}

export async function createCollection(
  input: CreateCollectionInput
): Promise<Collection> {
  const collection = await prisma.collection.create({
    data: {
      name: input.name,
      isVisible: input.isVisible !== undefined ? input.isVisible : true
    },
    include: {
      stories: true
    }
  });

  return {
    id: collection.id,
    name: collection.name,
    isVisible: collection.isVisible,
    storyCount: collection.stories.length
  };
}

export async function updateCollection(
  input: UpdateCollectionInput
): Promise<Collection> {
  const existingCollection = await prisma.collection.findUnique({
    where: { id: input.id },
    include: {
      stories: true
    }
  });

  if (!existingCollection) {
    throw new Error("Collection not found");
  }

  const updateData: any = {};
  if (input.name !== undefined) updateData.name = input.name;
  if (input.isVisible !== undefined) updateData.isVisible = input.isVisible;

  const collection = await prisma.collection.update({
    where: { id: input.id },
    data: updateData,
    include: {
      stories: true
    }
  });

  return {
    id: collection.id,
    name: collection.name,
    isVisible: collection.isVisible,
    storyCount: collection.stories.length
  };
}

export async function deleteCollection(id: string): Promise<void> {
  await prisma.collection.delete({
    where: { id }
  });
}
