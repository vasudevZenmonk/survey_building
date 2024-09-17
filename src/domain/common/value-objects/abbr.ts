import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsAlphanumeric,
  IsNotEmpty,
  Length,
  validateSync,
} from 'class-validator';

export class Abbr {
  @IsNotEmpty({ message: 'Abbreviation is required' })
  @Length(1, 10, {
    message: 'Abbreviation must be between 1 and 10 characters',
  })
  @Transform(({ value }: { value: string }) => value?.trimStart()?.trimEnd())
  @IsAlphanumeric()
  @Transform(({ value }: { value: string }) => value?.toUpperCase())
  private readonly value: string;

  constructor(value: string) {
    console.log(value);
    this.value = value;
    this.validate();
  }

  private validate() {
    const errors = validateSync(this);

    if (errors.length > 0) {
      throw new BadRequestException('Invalid abbr');
    }
  }

  getValue() {
    return this.value;
  }
}
