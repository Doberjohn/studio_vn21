import { prisma } from "~/shared/db/prisma";
import type { Story } from "~/shared/types/story";

export interface CreateStoryInput {
  title: string;
  author: string;
  description: string;
  content: string;
  coverImage: string;
  desktopCoverImage?: string;
  featuredCoverImage?: string;
  publishDate: string; // Format: "DD/MM/YYYY"
  featured?: boolean;
  isVisible?: boolean;
  genres: string[];
  collections: string[];
}

export interface UpdateStoryInput extends Partial<CreateStoryInput> {
  id: string;
}

export async function createStory(input: CreateStoryInput): Promise<Story> {
  const genreConnections = await Promise.all(
    input.genres.map(async (genreName) => {
      const genre = await prisma.genre.upsert({
        where: { name: genreName },
        update: {},
        create: { name: genreName, isVisible: true }
      });
      return { genreId: genre.id };
    }),
  );

  const collectionConnections = await Promise.all(
    input.collections.map(async (collectionName) => {
      const collection = await prisma.collection.upsert({
        where: { name: collectionName },
        update: {},
        create: { name: collectionName, isVisible: true }
      });
      return { collectionId: collection.id };
    }),
  );

  const story = await prisma.story.create({
    data: {
      title: input.title,
      author: input.author,
      description: input.description,
      content: input.content,
      coverImage: input.coverImage,
      desktopCoverImage: input.desktopCoverImage || null,
      featuredCoverImage: input.featuredCoverImage || null,
      publishDate: parseDate(input.publishDate),
      featured: input.featured || false,
      isVisible: input.isVisible !== undefined ? input.isVisible : true,
      genres: {
        create: genreConnections
      },
      collections: {
        create: collectionConnections
      },
    },
    include: {
      genres: { include: { genre: true } },
      collections: { include: { collection: true } }
    },
  });

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
    publishDate: input.publishDate,
    featured: story.featured
  };
}

export async function updateStory(input: UpdateStoryInput): Promise<Story> {
  const { id, genres, collections, publishDate, ...storyData } = input;
  const existingStory = await prisma.story.findUnique({
    where: { id },
    include: {
      genres: { include: { genre: true } },
      collections: { include: { collection: true } }
    },
  });

  if (!existingStory) {
    throw new Error("Story not found");
  }

  const updateData: any = {};

  if (storyData.title !== undefined) updateData.title = storyData.title;
  if (storyData.author !== undefined) updateData.author = storyData.author;
  if (storyData.description !== undefined)
    updateData.description = storyData.description;
  if (storyData.content !== undefined) updateData.content = storyData.content;
  if (storyData.coverImage !== undefined)
    updateData.coverImage = storyData.coverImage;
  if (storyData.desktopCoverImage !== undefined) {
    updateData.desktopCoverImage = storyData.desktopCoverImage || null;
  }
  if (storyData.featuredCoverImage !== undefined) {
    updateData.featuredCoverImage = storyData.featuredCoverImage || null;
  }
  if (publishDate) updateData.publishDate = parseDate(publishDate);
  if (storyData.featured !== undefined)
    updateData.featured = storyData.featured;
  if (storyData.isVisible !== undefined)
    updateData.isVisible = storyData.isVisible;

  if (genres) {
    await prisma.storyGenre.deleteMany({
      where: { storyId: id }
    });

    const genreConnections = await Promise.all(
      genres.map(async (genreName) => {
        const genre = await prisma.genre.upsert({
          where: { name: genreName },
          update: {},
          create: { name: genreName, isVisible: true }
        });
        return { genreId: genre.id };
      }),
    );

    updateData.genres = {
      create: genreConnections
    };
  }

  if (collections) {
    await prisma.storyCollection.deleteMany({
      where: { storyId: id }
    });

    const collectionConnections = await Promise.all(
      collections.map(async (collectionName) => {
        const collection = await prisma.collection.upsert({
          where: { name: collectionName },
          update: {},
          create: { name: collectionName, isVisible: true }
        });
        return { collectionId: collection.id };
      }),
    );

    updateData.collections = {
      create: collectionConnections
    };
  }

  const story = await prisma.story.update({
    where: { id },
    data: updateData,
    include: {
      genres: { include: { genre: true } },
      collections: { include: { collection: true } }
    },
  });

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
    publishDate: publishDate || formatDateFromDate(story.publishDate),
    featured: story.featured
  };
}

export async function deleteStory(id: string): Promise<void> {
  await prisma.story.delete({
    where: { id }
  });
}

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateFromDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
