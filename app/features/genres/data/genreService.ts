import { prisma } from "~/shared/db/prisma";
import type { Genre } from "~/shared/types/genre";

export async function getAllGenres(): Promise<Genre[]> {
  const genres = await prisma.genre.findMany({
    include: {
      stories: true
    },
    orderBy: { name: "asc" }
  });

  return genres.map((genre) => ({
    id: genre.id,
    name: genre.name,
    isVisible: genre.isVisible,
    storyCount: genre.stories.length
  }));
}

export async function getGenreById(id: string): Promise<Genre | null> {
  const genre = await prisma.genre.findUnique({
    where: { id },
    include: {
      stories: true
    }
  });

  if (!genre) return null;

  return {
    id: genre.id,
    name: genre.name,
    isVisible: genre.isVisible,
    storyCount: genre.stories.length
  };
}
