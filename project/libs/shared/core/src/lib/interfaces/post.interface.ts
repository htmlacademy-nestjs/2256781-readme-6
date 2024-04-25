import { TPostContentList } from '../types/post-type.type';
import { TPostStatusList } from '../types/post-status.type';
import { Comment } from './comment.interface';
import { Like } from './like.interface';

export interface Post {
  id?: string;
  originalId?: string;
  userId?: string;
  authorId?: string;
  type: TPostContentList;
  createdAt?: Date;
  postedAt?: Date;
  status: TPostStatusList;
  isReposted: boolean;
  tags?: string[];
  likes?: Like[];
  likesCount?: number;
  comments?: Comment[];
  commentsCount?: number;
}
