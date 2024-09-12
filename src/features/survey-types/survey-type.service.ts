import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyTypeRepository } from 'src/infrastructure/repositories/survey-type/survey-types.repository';
import { CreateSurveyTypeDto } from './survey-type-dto';

@Injectable()
export class SurveyTypeService {
  constructor(
    @InjectRepository(SurveyTypeRepository)
    private surveyTypeRepository: SurveyTypeRepository,
  ) {}
  async createSurveyType(payload: CreateSurveyTypeDto) {

    return this.surveyTypeRepository.createSurveyType(payload);
  }
}
