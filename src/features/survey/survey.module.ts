import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controllers';
import { surveyService } from './survey.service';
import { SurveyRepository } from 'src/infrastructure/repositories/survey/survey.repository';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { QuestionRepository } from 'src/infrastructure/repositories/question/question.repository';
import { ReorderOrAddSurveyQuestionsBySurveyIdController } from './reorder-or-add-survey-questions-by-survey-id/reorder-or-add-survey-questions-by-survey-id.controller';
import { reorderOrAddSurveyQuestionsBySurveyIdService } from './reorder-or-add-survey-questions-by-survey-id/reorder-or-add-survey-questions-by-survey-id.service';

@Module({
  controllers: [SurveyController, ReorderOrAddSurveyQuestionsBySurveyIdController],
  providers: [
    surveyService,
    SurveyRepository,
    OutboxMessageRepository,
    QuestionRepository,
    reorderOrAddSurveyQuestionsBySurveyIdService
  ],
})
export class SurveyModule {}
