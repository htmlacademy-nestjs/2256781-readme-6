export const PostStatusValue = {
  Posted: 'posted',
  Draft: 'draft',
} as const;

export type TPostStatusList = typeof PostStatusValue[keyof typeof PostStatusValue];
