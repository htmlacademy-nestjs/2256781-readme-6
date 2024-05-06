import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

import { AuthenticationValidateMessage, PasswordLength } from '../authentication-module/authentication.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User\'s uniq email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User\'s password',
    example: '123456'
  })
  @IsString()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public password: string;
}
