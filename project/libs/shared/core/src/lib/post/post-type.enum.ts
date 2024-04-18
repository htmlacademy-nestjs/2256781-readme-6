export const PostContent = {
  Video: 'video',
  Photo: 'photo',
  Link: 'link',
  Quote: 'quote',
  Text: 'text'
} as const;

export type TPostContentList = typeof PostContent[keyof typeof PostContent];
