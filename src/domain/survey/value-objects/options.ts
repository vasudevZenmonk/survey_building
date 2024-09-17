import { BadRequestException } from '@nestjs/common';
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsBoolean,
  validateSync,
} from 'class-validator';

export class Options {
  @IsNotEmpty({ message: 'URL is required' })
  @IsString({ message: 'URL must be a string' })
  @IsUrl({}, { message: 'Invalid URL format' })
  private readonly url: string;

  @IsNotEmpty({ message: 'is_mandatory is required' })
  @IsBoolean({ message: 'is_mandatory must be a boolean' })
  private readonly is_mandatory: boolean;

  constructor(url: string, is_mandatory: boolean) {
    this.url = url;
    this.is_mandatory = is_mandatory;
    this.validate();
  }

  private validate() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map((error) => Object.values(error.constraints)).join(', '),
      );
    }
  }

  getUrl() {
    return this.url;
  }

  isMandatory() {
    return this.is_mandatory;
  }
}
