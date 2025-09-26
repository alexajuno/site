import { $Enums } from "@prisma/client"; 

export type Category = $Enums.Category;

export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  updated?: string;
  category: Category;
  tags: string[];
  excerpt: string;
  content: string;
  commentCount?: number;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface PostWithComments extends Post {
  comments: Comment[];
}

