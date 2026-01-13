import { prisma } from "~/shared/db/prisma";
import type { Story } from "~/shared/types/story";

export async function getAllStories(): Promise<Story[]> {
  const stories = await prisma.story.findMany({
    include: {
      genres: { include: { genre: true } },
      collections: { include: { collection: true } },
    },
    orderBy: { publishDate: "desc" },
  });

  return stories.map(transformStory);
}

export async function getStoryById(id: string): Promise<Story | null> {
  const story = await prisma.story.findUnique({
    where: { id },
    include: {
      genres: { include: { genre: true } },
      collections: { include: { collection: true } },
    },
  });

  return story ? transformStory(story) : null;
}

export async function getFeaturedStory(): Promise<Story | null> {
  const story = await prisma.story.findFirst({
    where: { featured: true },
    include: {
      genres: { include: { genre: true } },
      collections: { include: { collection: true } },
    },
    orderBy: { publishDate: "desc" },
  });

  return story ? transformStory(story) : null;
}

export async function getStoriesByGenre(genreName: string): Promise<Story[]> {
  const stories = await prisma.story.findMany({
    where: {
      genres: {
        some: {
          genre: {
            name: genreName,
          },
        },
      },
    },
    include: {
      genres: { include: { genre: true } },
      collections: { include: { collection: true } },
    },
    orderBy: { publishDate: "desc" },
  });

  return stories.map(transformStory);
}

export async function getStoriesByCollection(
  collectionName: string,
): Promise<Story[]> {
  const stories = await prisma.story.findMany({
    where: {
      collections: {
        some: {
          collection: {
            name: collectionName,
          },
        },
      },
    },
    include: {
      genres: { include: { genre: true } },
      collections: { include: { collection: true } },
    },
    orderBy: { publishDate: "desc" },
  });

  return stories.map(transformStory);
}

export async function getAllGenres(): Promise<string[]> {
  const genres = await prisma.genre.findMany({
    orderBy: { name: "asc" },
  });
  return genres.map((g) => g.name);
}

export async function getAllCollections(): Promise<string[]> {
  const collections = await prisma.collection.findMany({
    orderBy: { name: "asc" },
  });
  return collections.map((c) => c.name);
}

function transformStory(story: {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  coverImage: string;
  desktopCoverImage: string | null;
  featuredCoverImage: string | null;
  publishDate: Date;
  featured: boolean;
  genres: Array<{ genre: { name: string } }>;
  collections: Array<{ collection: { name: string } }>;
}): Story {
  return {
    id: story.id,
    title: story.title,
    author: story.author,
    genres: story.genres.map((sg) => sg.genre.name),
    collections: story.collections.map((sc) => sc.collection.name),
    description: story.description,
    coverImage: story.coverImage,
    desktopCoverImage: story.desktopCoverImage ?? undefined,
    featuredCoverImage: story.featuredCoverImage ?? undefined,
    content: story.content,
    publishDate: formatDate(story.publishDate),
    featured: story.featured,
  };
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
