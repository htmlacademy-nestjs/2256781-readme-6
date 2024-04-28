import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'the uniq user\'s ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'user\'s email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'user\'s access token',
    example: 'user@user.local'
  })
  @Expose()
  public accessToken: string;
}
