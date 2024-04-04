import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User\'s uniq email',
    example: 'user@user.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User\'s password',
    example: '123456'
  })
  public password: string;
}
