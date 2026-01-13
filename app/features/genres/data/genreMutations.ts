import { prisma } from "~/shared/db/prisma";
import type { Genre } from "~/shared/types/genre";

export interface CreateGenreInput {
  name: string;
  isVisible?: boolean;
}

export interface UpdateGenreInput {
  id: string;
  name?: string;
  isVisible?: boolean;
}

export async function createGenre(input: CreateGenreInput): Promise<Genre> {
  const genre = await prisma.genre.create({
    data: {
      name: input.name,
      isVisible: input.isVisible !== undefined ? input.isVisible : true
    },
    include: {
      stories: true
    }
  });

  return {
    id: genre.id,
    name: genre.name,
    isVisible: genre.isVisible,
    storyCount: genre.stories.length
  };
}

export async function updateGenre(input: UpdateGenreInput): Promise<Genre> {
  const existingGenre = await prisma.genre.findUnique({
    where: { id: input.id },
    include: {
      stories: true
    }
  });

  if (!existingGenre) {
    throw new Error("Genre not found");
  }

  const updateData: any = {};
  if (input.name !== undefined) updateData.name = input.name;
  if (input.isVisible !== undefined) updateData.isVisible = input.isVisible;

  const genre = await prisma.genre.update({
    where: { id: input.id },
    data: updateData,
    include: {
      stories: true
    }
  });

  return {
    id: genre.id,
    name: genre.name,
    isVisible: genre.isVisible,
    storyCount: genre.stories.length
  };
}

export async function deleteGenre(id: string): Promise<void> {
  await prisma.genre.delete({
    where: { id }
  });
}
