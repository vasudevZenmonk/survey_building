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

export class active {
  @IsObject()
  private readonly value;

  constructor(value) {
    this.value = value;
    this.validate(value);
  }

  private validate(value: any) {
    if (typeof value !== 'object') {
      throw new BadRequestException('Invalid Object');
    }
    if (!value.modality) {
      throw new BadRequestException('Modality missing');
    } else if (!(value.modality in surveyGroupOptionEnum)) {
      throw new BadRequestException('Invalid Modality');
    }
    if (!value.language) {
      throw new BadRequestException('Language Missing');
    } else if (!(value.language in surveyGroupLanguageEnum)) {
      throw new BadRequestException('Invalid Language');
    }
    return true;
  }

  getValue() {
    return this.value;
  }
}
