export interface Story {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: string;
  duration: string;
  content: string;
  featured?: boolean;
}
