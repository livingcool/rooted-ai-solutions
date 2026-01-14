import { Share2, Clock, Calendar, User, ArrowRight } from "lucide-react";

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    readTime: string;
    author: string;
    category: string;
    content: string; // HTML or Markdown content
}

export const blogPosts: BlogPost[] = [];
