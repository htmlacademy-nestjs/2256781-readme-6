import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

import { CreateCommentDto } from '../dto/create-comment.dto';

const TYPE = 'body';

export class CreateCommentValidationPipe implements PipeTransform {
  async transform(dto: CreateCommentDto, { type }: ArgumentMetadata) {
    if (type === TYPE) {
      const comment = plainToInstance(CreateCommentDto, dto);
      const errors = await validate(comment, { validationError: { target: false } });

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

      return dto;
    }
  }
}
