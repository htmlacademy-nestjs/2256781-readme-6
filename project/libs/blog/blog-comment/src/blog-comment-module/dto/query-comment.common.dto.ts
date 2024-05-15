import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import { SortDirection } from '@project/shared/core';

import { COMMENT_MAX_COMMENTS_COUNT, COMMENT_DEFAULT_SORT_DIRECTION } from '../blog-comment.constant';

export class QueryCommentCommonDto {
  @ApiProperty({
    description: 'limit',
    example: 25,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public limit: number = COMMENT_MAX_COMMENTS_COUNT;

  @ApiProperty({
    description: 'Post ID',
    example: '1',
  })
  @IsString()
  @IsOptional()
  public postId?: string;

  @ApiProperty({
    description: 'Sort direction',
    example: 'desc',
  })
  @IsIn(Object.values(SortDirection))
  @IsString()
  @IsOptional()
  public sortDirection: SortDirection = COMMENT_DEFAULT_SORT_DIRECTION;

  @ApiProperty({
    description: 'Page number',
    example: 1
  })
  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
