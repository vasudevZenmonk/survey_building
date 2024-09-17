import { BadRequestException } from '@nestjs/common';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsObject,
  validateSync,
} from 'class-validator';
import { surveyGroupLanguageEnum } from 'src/domain/survey_group/enum/survey_group_language.enum';
import { surveyGroupOptionEnum } from 'src/domain/survey_group/enum/survey_group_option.enum';

export class Option {
  @IsObject()
  private readonly value;

  constructor(value) {
    this.value = value;
    this.validate(value);
  }

  private validate(value: any) {
    // Check if value is an object
    if (typeof value !== 'object') {
      throw new BadRequestException('Invalid Object');
    }

    // Validate modality
    if (!value.modality) {
      throw new BadRequestException('Modality missing');
    } else if (!Object.values(surveyGroupOptionEnum).includes(value.modality)) {
      throw new BadRequestException('Invalid Modality');
    }

    // Validate language
    if (!value.language) {
      throw new BadRequestException('Language Missing');
    } else if (
      !Object.values(surveyGroupLanguageEnum).includes(value.language)
    ) {
      throw new BadRequestException('Invalid Language');
    }

    return true;
  }

  getValue() {
    return this.value;
  }
}
