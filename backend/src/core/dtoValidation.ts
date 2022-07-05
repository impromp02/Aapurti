import {
  ArgumentMetadata,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { Schema } from 'zod';

export class DtoValidation implements PipeTransform {
  constructor(private schema: Schema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const validationOutput = this.schema.safeParse(value);
    if (validationOutput.success) return validationOutput.data;
    else throw new BadRequestException('Validation Error');
  }
}
