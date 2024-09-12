import { Body, Controller, Post } from '@nestjs/common';
import { SurveyTypeService } from './survey-type.service';
import { CreateSurveyTypeDto } from './survey-type-dto';

@Controller('survey-type')
export class SurveyTypeController {
  constructor(private readonly surveyTypeDto: SurveyTypeService) {}

  @Post('')
  async createSurveyType(@Body() payload: CreateSurveyTypeDto) {
    return this.surveyTypeDto.createSurveyType(payload);
  }
}
