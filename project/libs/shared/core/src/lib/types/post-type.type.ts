export const PostContentValue = {
  Video: 'video',
  Photo: 'photo',
  Link: 'link',
  Quote: 'quote',
  Text: 'text'
} as const;

export type TPostContentList = typeof PostContentValue[keyof typeof PostContentValue];
