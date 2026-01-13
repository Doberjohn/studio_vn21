import { prisma } from "~/shared/db/prisma";
import type { Story } from "~/shared/types/story";

export async function getAllStories(): Promise<Story[]> {
  const stories = await prisma.story.findMany({
    where: { isVisible: true },
    include: {
      genres: {
        include: {
          genre: true
        },
      },
      collections: {
        include: {
          collection: true
        },
      },
    },
    orderBy: { publishDate: "desc" },
  });

  return stories.map((s) => transformStory(s));
}

export async function getStoryByIdForAdmin(id: string): Promise<Story | null> {
  const story = await prisma.story.findUnique({
    where: { id },
    include: {
      genres: {
        include: {
          genre: true
        },
      },
      collections: {
        include: {
          collection: true
        },
      },
    },
  });

  return story ? transformStory(story, false) : null;
}

export async function getFeaturedStory(): Promise<Story | null> {
  const story = await prisma.story.findFirst({
    where: { featured: true, isVisible: true },
    include: {
      genres: {
        include: {
          genre: true
        },
      },
      collections: {
        include: {
          collection: true
        },
      },
    },
    orderBy: { publishDate: "desc" },
  });

  return story ? transformStory(story) : null;
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

export async function getAllStoriesForAdmin(): Promise<Story[]> {
  const stories = await prisma.story.findMany({
    include: {
      genres: {
        include: {
          genre: true
        },
      },
      collections: {
        include: {
          collection: true
        },
      },
    },
    orderBy: { publishDate: "desc" }
  });

  return stories.map((s) => transformStory(s, false));
}

function transformStory(
  story: {
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
    genres: Array<{ genre: { name: string; isVisible: boolean } }>;
    collections: Array<{ collection: { name: string; isVisible: boolean } }>;
  },
  hideInvisibles = true
): Story {
  const visibleGenres = story.genres
    .filter((sg) => (hideInvisibles ? sg.genre.isVisible : true))
    .map((sg) => sg.genre.name);
  const visibleCollections = story.collections
    .filter((sc) => (hideInvisibles ? sc.collection.isVisible : true))
    .map((sc) => sc.collection.name);

  return {
    id: story.id,
    title: story.title,
    author: story.author,
    genres: visibleGenres,
    collections: visibleCollections,
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
