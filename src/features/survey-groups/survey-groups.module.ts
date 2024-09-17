import { Module } from '@nestjs/common';
import { SurveyGroupController } from './survey-groups.controller';
import { SurveyGroupService } from './survey-groups.service';
import { SurveyGroupRepository } from 'src/infrastructure/repositories/survey-group/survey-group.repository';
import { surveyService } from '../survey/survey.service';
import { SurveyRepository } from 'src/infrastructure/repositories/survey/survey.repository';
import { SurveyTypeRepository } from 'src/infrastructure/repositories/survey-type/survey-types.repository';
import { SurveyQuestionRepository } from 'src/infrastructure/repositories/survey-questions/survey-question.repository';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';

@Module({
  controllers: [SurveyGroupController],
  providers: [
    SurveyGroupService,
    SurveyGroupRepository,
    surveyService,
    SurveyRepository,
    SurveyTypeRepository,
    SurveyQuestionRepository,
    OutboxMessageRepository
  ],
})
export class SurveyGroupModule {}
