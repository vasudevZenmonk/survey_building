import { Injectable } from '@nestjs/common';
import { SurveyQuestion } from 'src/domain/survey_question/survey_question.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SurveyQuestionRepository extends Repository<SurveyQuestion> {
  constructor(private dataSource: DataSource) {
    super(SurveyQuestion, dataSource.createEntityManager());
  }

  async getSurveyQuestionBySurveyUUID(
    survey_id: number,
  ): Promise<SurveyQuestion[]> {
    return this.find({ where: { survey_id } });
  }

  async bulkCreate(payload): Promise<SurveyQuestion[]> {
    return this.save(payload);
  }

  async createOrUpdateSurveyQuestion(
    surveyId: number,
    questionId: number,
    payload: any,
  ): Promise<SurveyQuestion> {
    await this.upsert(
      {
        survey_id: surveyId,
        question_id: questionId,
        ...payload,
      },
      ['survey_id', 'question_id'],
    );
    return this.findOne({
      where: { survey_id: surveyId, question_id: questionId },
    });
  }

  async softDeleteSurveyQuestion(
    surveyId: number,
    questionId: number,
    transaction?: EntityManager,
  ): Promise<void> {
    const criteria = {
      surveyId,
      questionId,
    };

    if (transaction) {
      await transaction.softDelete(SurveyQuestion, criteria);
    } else {
      await this.surveyQuestionRepository.softDelete(criteria);
    }
  }
}
