import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { surveyService } from './survey.service';
import { UUID } from 'crypto';
import { UpdateSurveyDto } from './survey.dto';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: surveyService) {}

  @Post('')
  async createSurvey(payload) {
    return this.createSurvey(payload);
  }

  @Get(':survey_uuid')
  async getSurveyById(
    @Param('survey_uuid') survey_uuid: UUID,
    @Query('archived_questions') archived_questions: boolean,
  ) {
    return this.surveyService.getSurveyById(survey_uuid, archived_questions);
  }

  @Put(':survey_uuid')
  async updateSurveyById(
    @Param('survey_uuid') survey_uuid: UUID,
    @Body() body: UpdateSurveyDto,
  ) {
    try {
      console.log(body);
      const update = await this.surveyService.updateSurveyById(
        survey_uuid,
        body,
      );
      console.log(update);
      return update;
    } catch (error) {
      throw new Error('Error Occurred while upgrading' + error);
    }
  }
}
