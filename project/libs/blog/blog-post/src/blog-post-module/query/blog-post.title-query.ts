import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { SortDirection } from '@project/shared/core';

import { POST_DEFAULT_SEARCH_COUNT_LIMIT, POST_DEFAULT_SORT_DIRECTION } from '../blog-post.constant';

export class BlogTitleQuery {
  @ApiProperty({
    description: 'Limit',
    example: 25,
  })
  @Transform(({ value }) => +value || POST_DEFAULT_SEARCH_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = POST_DEFAULT_SEARCH_COUNT_LIMIT;

  @ApiProperty({
    description: 'Sort direction',
    example: 'desc',
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = POST_DEFAULT_SORT_DIRECTION;

  @ApiProperty({
    description: 'Title',
    example: 'title',
  })
  @IsString()
  public title?: string = '';
}
