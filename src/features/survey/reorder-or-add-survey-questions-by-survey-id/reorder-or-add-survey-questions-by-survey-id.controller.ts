import { Body, Controller, Param, Put } from '@nestjs/common';
import { reorderOrAddSurveyQuestionsBySurveyIdService } from './reorder-or-add-survey-questions-by-survey-id.service';

@Controller('surveys')
export class ReorderOrAddSurveyQuestionsBySurveyIdController {
  constructor(
    private readonly reorderOrAddSurveyQuestionsBySurveyIdService: reorderOrAddSurveyQuestionsBySurveyIdService,
  ) {}

  @Put(':survey_uuid/questions')
  async reorderOrAddSurveyQuestionsBySurveyId(
    @Param('survey_uuid') survey_uuid: string,
    @Body() body,
  ) {
    return this.reorderOrAddSurveyQuestionsBySurveyIdService.reorderOrAddSurveyQuestionsBySurveyId(survey_uuid, body);
  }
}
