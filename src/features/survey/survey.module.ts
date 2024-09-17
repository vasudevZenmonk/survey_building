import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controllers';
import { surveyService } from './survey.service';
import { SurveyRepository } from 'src/infrastructure/repositories/survey/survey.repository';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';

@Module({
  controllers: [SurveyController],
  providers: [surveyService, SurveyRepository, OutboxMessageRepository],
})
export class SurveyModule {}
