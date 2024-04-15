import { TPostContentList } from './post-type.enum';
import { TPostStatusList } from './post-status.enum';
import { Comment } from '../comment/comment.interface';
import { Like } from '../like/like.interface';

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
