import { BadRequestException } from '@nestjs/common';
import { IsBoolean, IsIn, IsNotEmpty, validateSync } from 'class-validator';

export class active {
  @IsBoolean({ message: 'Active must be a boolean' })
  @IsNotEmpty({ message: 'Active is required' })
  @IsIn([true, false], { message: 'Active must be true or false' })
  private readonly value: boolean;

  constructor(value: boolean) {
    this.value = value;
    this.validate();
  }

  private validate() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid name');
    }
  }

  getValue() {
    return this.value;
  }
}
