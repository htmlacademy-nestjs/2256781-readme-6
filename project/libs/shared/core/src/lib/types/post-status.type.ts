import { PostStatus } from '../enums/post-status.enum';

export type TPostStatusList = typeof PostStatus[keyof typeof PostStatus];
