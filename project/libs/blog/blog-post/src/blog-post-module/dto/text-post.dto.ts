import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { BasePostDto } from './base-post.dto';
import { PostTextLength, PostTitleLength, PostExcerptLength } from '@project/blog-post';

export class CreateTextPostDto extends BasePostDto {
  @ApiProperty({
    description: 'Text of post',
    example: 'Text',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(PostTextLength.Min)
  @MaxLength(PostTextLength.Max)
  public description: string;

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
    description: 'Excerpt of post',
    example: 'Text',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(PostExcerptLength.Min)
  @MaxLength(PostExcerptLength.Max)
  public excerpt: string;
}
