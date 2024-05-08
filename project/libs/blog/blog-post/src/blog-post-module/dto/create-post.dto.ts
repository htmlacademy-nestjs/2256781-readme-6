import {
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsString()
  @IsMongoId()
  public userId: string;
}
