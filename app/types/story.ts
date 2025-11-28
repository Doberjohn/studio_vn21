export interface Story {
  id: string;
  title: string;
  author: string;
  genres: string[];
  collections: string[];
  description: string;
  coverImage: string;
  desktopCoverImage?: string;
  content: string;
  publishDate: string;
  featured?: boolean;
  featuredCoverImage?: string;
}
