import { Module } from '@nestjs/common';
import { SurveyTypeController } from './survey-types.controller';
import { SurveyTypeService } from './survey-type.service';
import { SurveyTypeRepository } from 'src/infrastructure/repositories/survey-type/survey-types.repository';

@Module({
  controllers: [SurveyTypeController],
  providers: [SurveyTypeService, SurveyTypeRepository],
})
export class SurveyTypeModule {}
