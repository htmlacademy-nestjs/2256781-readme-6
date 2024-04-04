export const PostStatusType = {
  Posted: 'posted',
  Draft: 'draft',
} as const;

export type PostStatusList = typeof PostStatusType[keyof typeof PostStatusType];
