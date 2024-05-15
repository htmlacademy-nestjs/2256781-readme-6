import { IsNotEmpty, IsString } from 'class-validator';
import { CommentValidateMessage } from '../blog-comment.constant';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: CommentValidateMessage.InvalidPostId })
  public postId: string;

  @IsString()
  @IsNotEmpty({ message: CommentValidateMessage.MessageIsEmpty })
  public message: string;
}
