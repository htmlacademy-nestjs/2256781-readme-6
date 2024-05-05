import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { BlogLikeValidateMessage } from '../blog-like.constant';

export class CreateLikeDto {
  @IsString()
  @IsNotEmpty({ message: BlogLikeValidateMessage.InvalidPostID })
  public postId: string;

  @IsString()
  @IsMongoId({ message: BlogLikeValidateMessage.InvalidUserID })
  public userId: string;
}
