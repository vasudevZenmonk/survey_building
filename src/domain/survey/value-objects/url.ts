import { BadRequestException } from '@nestjs/common';
import { IsEmpty, IsString, IsUrl, validateSync } from 'class-validator';

// interface optionINterface {
//   url: string;
//   is_mandatory: boolean;
// }

export class Url {
  @IsEmpty()
  @IsString()
  @IsUrl()
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.validate();
  }

  private validate() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid url');
    }
  }

  getValue() {
    return this.value;
  }
}
