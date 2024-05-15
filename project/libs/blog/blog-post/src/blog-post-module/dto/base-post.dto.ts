import { ApiProperty } from '@nestjs/swagger';
import { PostContent, PostStatus, TPostContentList, TPostStatusList } from '@project/shared/core';
import {
  ArrayMaxSize,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { PostError, PostRegExpPattern, PostTagDefaultParam } from '../blog-post.constant';

export class BasePostDto {
  @ApiProperty({
    description: 'Type of post',
    example: 'text',
  })
  @IsEnum(PostContent)
  public type?: TPostContentList;

  @ApiProperty({
    description: 'User id of post',
    example: 'text',
  })
  @IsString()
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: 'Status of post',
    example: 'published',
  })
  @IsOptional()
  @IsEnum(PostStatus)
  public status?: TPostStatusList;

  @ApiProperty({
    description: 'Tags of post',
    example: '#text-tag',
  })
  @IsOptional()
  @NotContains(' ', { each: true, message: PostError.SpacesInTag })
  @Matches(PostRegExpPattern.Tag, { each: true, message: PostError.WrongTagStart })
  @MinLength(PostTagDefaultParam.MinLength, { each: true })
  @MaxLength(PostTagDefaultParam.MaxLength, { each: true })
  @ArrayMaxSize(PostTagDefaultParam.Amount)
  public tags?: string[];

  @ApiProperty({
    description: 'is reposted?',
    example: 'true',
  })
  @IsBoolean()
  public isReposted?: boolean;
}
