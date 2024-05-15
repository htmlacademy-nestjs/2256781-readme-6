import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, MaxLength, MinLength } from 'class-validator';

import { PostContent, SortBy, SortDirection } from '@project/shared/core';

import {
  POST_DEFAULT_COUNT_LIMIT,
  POST_DEFAULT_SORT_DIRECTION,
  POST_DEFAULT_PAGE_COUNT,
  POST_DEFAULT_SORT_BY,
  PostTagDefaultParam
} from '../blog-post.constant';
import { ApiProperty } from '@nestjs/swagger';


export class BlogCommonQuery {
  @ApiProperty({
    description: 'Limit',
    example: 25,
  })
  @Transform(({ value }) => +value || POST_DEFAULT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = POST_DEFAULT_COUNT_LIMIT;

  @ApiProperty({
    description: 'Type',
    example: 'text',
  })
  @IsIn(Object.values(PostContent))
  @IsOptional()
  public type?: PostContent;

  @ApiProperty({
    description: 'User ID',
    example: '1',
  })
  @IsOptional()
  public userId?: string;

  @ApiProperty({
    description: 'Sort by',
    example: 'createdAt',
  })
  @IsIn(Object.values(SortBy))
  @IsOptional()
  public sortBy?: SortBy = POST_DEFAULT_SORT_BY;

  @ApiProperty({
    description: 'Tag',
    example: 'tag',
  })
  @IsOptional()
  @MinLength(PostTagDefaultParam.MinLength)
  @MaxLength(PostTagDefaultParam.MaxLength)
  public tag?: string = '';

  @ApiProperty({
    description: 'Sort direction',
    example: 'desc',
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = POST_DEFAULT_SORT_DIRECTION;

  @ApiProperty({
    description: 'Page',
    example: 1,
  })
  @Transform(({ value }) => +value || POST_DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = POST_DEFAULT_PAGE_COUNT;
}
