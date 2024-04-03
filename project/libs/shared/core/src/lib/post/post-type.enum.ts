export const PostContentType = {
  Video: 'video',
  Photo: 'photo',
  Link: 'link',
  Quote: 'quote',
  Text: 'text'
} as const;

export type PostContentList = typeof PostContentType[keyof typeof PostContentType];
