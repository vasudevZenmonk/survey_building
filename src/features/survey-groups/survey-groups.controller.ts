import { Controller, Get, Post } from '@nestjs/common';
import { SurveyGroupService } from './survey-groups.service';

@Controller('survey-group')
export class SurveyGroupController {
  constructor(private readonly surveyGroupService: SurveyGroupService) {}

  @Get('')
  async getFilteredSurveyGroup() {}

  @Post('')
  async createSurveyGroup(payload) {
    return this.surveyGroupService.createSurveyGroup(payload);
  }
}
