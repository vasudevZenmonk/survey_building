import { Controller, Post } from '@nestjs/common';
import { surveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: surveyService) {}

  @Post('')
  async createSurvey(payload) {
    return this.createSurvey(payload);
  }
}
