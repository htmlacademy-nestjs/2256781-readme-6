export const PostStatus = {
  Posted: 'posted',
  Draft: 'draft',
} as const;

export type TPostStatusList = typeof PostStatus[keyof typeof PostStatus];
