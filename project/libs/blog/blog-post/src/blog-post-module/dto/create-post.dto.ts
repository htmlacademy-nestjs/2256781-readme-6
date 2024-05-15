import { PostContent } from '@project/shared/core';

import { CreateLinkPostDto } from './link-post.dto';
import { CreatePhotoPostDto } from './photo-post.dto';
import { CreateVideoPostDto } from './video-post.dto';
import { CreateQuotePostDto } from './quote-post.dto';
import { CreateTextPostDto } from './text-post.dto';

export type TPostDto = CreateLinkPostDto | CreatePhotoPostDto | CreateQuotePostDto | CreateTextPostDto | CreateVideoPostDto;

export const PostTypeDto = {
  [PostContent.video]: CreateVideoPostDto,
  [PostContent.text]: CreateTextPostDto,
  [PostContent.link]: CreateLinkPostDto,
  [PostContent.photo]: CreatePhotoPostDto,
  [PostContent.quote]: CreateQuotePostDto
}
