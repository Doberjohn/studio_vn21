export interface Story {
  id: string;
  title: string;
  author: string;
  genre: string;
  collection: string;
  description: string;
  coverImage: string;
  duration: string;
  content: string;
  publishDate: string;
  featured?: boolean;
  featuredCoverImage?: string;
}
