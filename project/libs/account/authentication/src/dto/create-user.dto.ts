import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User\'s avatar',
    example: 'https://assets.htmlacademy.ru/previews/779/20230522_f0b2228f-150.jpg'
  })
  public avatar?: string;

  @ApiProperty({
    description: 'User\'s unique address',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User\'s login name',
    example: 'Keks Ivanov',
  })
  public login: string;

  @ApiProperty({
    description: 'User\'s password',
    example: '123456'
  })
  public password: string;
}
