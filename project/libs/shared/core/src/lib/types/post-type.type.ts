import { PostContent } from '../enums/post-type.enum';

export type TPostContentList = typeof PostContent[keyof typeof PostContent];
