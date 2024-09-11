import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyRepository } from 'src/infrastructure/repositories/survey/survey.repository';
import { createSurveyDto } from './survey.dto';
import { Survey } from 'src/domain/survey/survey.entity';

@Injectable()
export class surveyService {
  constructor(
    @InjectRepository(SurveyRepository)
    private surveyRepository: SurveyRepository,
  ) {}

  async createSurvey(payload: createSurveyDto): Promise<Survey> {
    try {
      return this.surveyRepository.createSurvey(payload);
    } catch (err) {
      throw new Error(err);
    }
  }
}
