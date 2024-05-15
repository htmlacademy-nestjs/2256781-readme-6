import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

import { CommentTextLength } from '../blog-comment.constant';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Message text',
    example: 'Message',
  })
  @IsString()
  @MinLength(CommentTextLength.Min)
  @MaxLength(CommentTextLength.Max)
  public message: string;
}
