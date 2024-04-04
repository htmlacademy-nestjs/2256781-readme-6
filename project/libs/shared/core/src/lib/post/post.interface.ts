import { PostContentList } from './post-type.enum';
import { PostStatusList } from './post-status.enum';
import { Comment } from '../comment/comment.interface';
import { Like } from '../like/like.interface';

export interface Post {
  id?: string;
  originalId?: string;
  userId?: string;
  authorId?: string;
  type: PostContentList;
  createdAt?: Date;
  postedAt?: Date;
  status: PostStatusList;
  isReposted: boolean;
  tags?: string[];
  likes?: Like[];
  likesCount?: number;
  comments?: Comment[];
  commentsCount?: number;
}
