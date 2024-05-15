import { Post } from '@project/shared/core';

export class SubmitNewsDto {
  public userId: string;
  public email: string;
  public posts: Post[];
}
