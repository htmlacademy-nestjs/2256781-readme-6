import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @ApiProperty({
    description: 'Post ID',
    example: '7349e3fd-41c9-427f-bdf4-7b77894a752b'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'User ID',
    example: '833edaea-5b61-4643-b779-324bb78997be'
  })
  @Expose()
  public userId: string;
}
