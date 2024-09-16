import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyRepository } from 'src/infrastructure/repositories/survey/survey.repository';
import { createSurveyDto } from './survey.dto';
import { Survey } from 'src/domain/survey/survey.entity';
import { UUID } from 'crypto';

@Injectable()
export class surveyService {
  constructor(
    @InjectRepository(SurveyRepository)
    private surveyRepository: SurveyRepository,
  ) {}

  async createSurvey(payload: createSurveyDto): Promise<Survey> {
      return this.surveyRepository.createSurvey(payload);

  }

  async getFilteredSurveys(payload) {
    let {
      name,
      type,
      abbr = [],
      archive = false,
      page = 1,
      limit = 10,
      order,
      order_column,
      order_column_type = '',
    } = payload;
    return this.surveyRepository.getFilteredSurveys(
      { name, type, abbr },
      { order_type: order, order_column, order_column_type, page, limit },
      archive,
    );
  }

  async getSurveyById(survey_uuid: UUID, archived_questions: boolean) {
    return this.surveyRepository.getSurveyById(
      survey_uuid,
      { get_questions: true },
      archived_questions,
    );
  }

  async updateSurveyById(survey_uuid, payload) {
    return this.surveyRepository.updateSurveyById(survey_uuid, payload);
  }
}
