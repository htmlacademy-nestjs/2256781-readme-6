import { Post } from './post.interface';

export interface TextPost extends Post {
  title: string;
  excerpt: string;
  text: string;
}
