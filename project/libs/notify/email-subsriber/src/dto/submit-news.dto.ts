import { IsArray, IsEmail, IsString } from 'class-validator';

import { Post } from '@project/shared/core';

import { EMAIL_NOT_VALID } from '../email-subscriber.constant';

export class SubmitNewsDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsArray()
  public posts: Post[];

  @IsString()
  public userId: string;
}
