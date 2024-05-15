import { TPostContentList } from '../types/post-type.type';
import { TPostStatusList } from '../types/post-status.type';
import { Comment } from './comment.interface';
import { Like } from './like.interface';

export interface Post {
  id?: string;
  userId?: string;
  type?: TPostContentList;
  status?: TPostStatusList;
  tags?: string[];
  comments?: Comment[];
  likes?: Like[];
  createdAt?: Date;
  postedAt?: Date;
  isReposted?: boolean;
  originalUserId?: string;
  originalPostId?: string;
  title?: string;
  description?: string;
  link?: string;
  quoteAuthor?: string;
  excerpt?: string;
  likesCount?: number;
  commentsCount?: number;
}
