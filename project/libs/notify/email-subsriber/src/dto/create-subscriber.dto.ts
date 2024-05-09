import { IsEmail, IsOptional, IsUUID } from 'class-validator';

import {
  EMAIL_NOT_VALID,
} from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsOptional()
  public login?: string;

  @IsUUID('all', { each: true })
  @IsOptional()
  public userId?: string;
}
