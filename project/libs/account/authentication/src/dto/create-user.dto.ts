import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { AuthenticationValidateMessage, LoginLength, PasswordLength } from '../authentication-module/authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User\'s avatar',
    example: 'https://assets.htmlacademy.ru/previews/779/20230522_f0b2228f-150.jpg'
  })
  @IsString()
  @IsOptional()
  public avatar?: string;

  @ApiProperty({
    description: 'User\'s unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User\'s login name',
    example: 'Keks Ivanov',
  })
  @IsString()
  @MinLength(LoginLength.Min)
  @MaxLength(LoginLength.Max)
  public login: string;

  @ApiProperty({
    description: 'User\'s password',
    example: '123456'
  })
  @IsString()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public password: string;
}
