import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controllers';
import { surveyService } from './survey.service';
import { SurveyRepository } from 'src/infrastructure/repositories/survey/survey.repository';

@Module({
  controllers: [SurveyController],
  providers: [surveyService, SurveyRepository],
})
export class SurveyModule {}
