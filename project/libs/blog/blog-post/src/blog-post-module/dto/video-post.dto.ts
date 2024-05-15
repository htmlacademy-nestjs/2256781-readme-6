import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';

import { BasePostDto } from './base-post.dto';
import { PostError, PostRegExpPattern, PostTitleLength } from '../blog-post.constant';

export class CreateVideoPostDto extends BasePostDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(PostTitleLength.Min)
  @MaxLength(PostTitleLength.Max)
  public title: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'https://www.youtube.com/watch?v=j2-GqaeSueA',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @Matches(PostRegExpPattern.Video, { message: PostError.WrongSource })
  public link: string;
}
