import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyGroupRepository } from 'src/infrastructure/repositories/survey-group/survey-group.repository';
import { surveyService } from '../survey/survey.service';
import { SurveyTypeRepository } from 'src/infrastructure/repositories/survey-type/survey-types.repository';
import { SurveyRepository } from 'src/infrastructure/repositories/survey/survey.repository';
import { SurveyQuestionRepository } from 'src/infrastructure/repositories/survey-questions/survey-question.repository';
import { SurveyGroup } from 'src/domain/survey_group/survey-group.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class SurveyGroupService {
  constructor(
    @InjectRepository(SurveyGroupRepository)
    private surveyGroupRepository: SurveyGroupRepository,
    @InjectRepository(SurveyTypeRepository)
    private surveyTypeRepository: SurveyTypeRepository,
    @InjectRepository(SurveyRepository)
    private surveyRepository: SurveyRepository,
    @InjectRepository(SurveyQuestionRepository)
    private surveyQuestionRepository: SurveyQuestionRepository,
    private surveyService: surveyService,
    private dataSource: DataSource,
  ) {}

  async getFilteredSurveyGroups(payload) {
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
    return this.surveyGroupRepository.getFilteredSurveyGroups(
      { name, type, abbr },
      { order_type: order, order_column, order_column_type, page, limit },
      archive,
    );
  }

  async createSurveyGroup(payload) {
    const queryRunner = this.dataSource.createQueryRunner();

    // Start the transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const surveyType = await this.surveyTypeRepository.getSurveyType(
        payload.survey_type_uuid,
      );
      if (!surveyType) {
        throw new Error('Survey Type doesn’t exist');
      }

      const surveyGroupPayload = {
        name: payload.name,
        survey_type_id: surveyType.id,
        abbr: payload.abbr,
        options: {
          language: payload.options?.language,
          modality: payload.options?.modality,
        },
      };

      const surveyGroup = await queryRunner.manager.save(
        this.surveyGroupRepository.create(surveyGroupPayload),
      );

      const surveyPayload = {
        survey_group_id: surveyGroup.id,
        name: payload.survey?.name,
        abbr: payload.survey?.abbr,
        options: {
          is_mandatory: payload.survey?.options?.is_mandatory,
          url: payload.survey?.options?.url,
        },
      };

      console.log(surveyPayload);

      const survey = await this.surveyService.createSurvey(surveyPayload, queryRunner);

      const questionSourceUUID = payload.survey?.question_source_uuid;

      if (questionSourceUUID) {
        const questionSourceSurvey =
          await this.surveyRepository.getSurveyByUUID(questionSourceUUID);
        if (!questionSourceSurvey) throw new Error('No Source Survey Exists');

        const questionSourceQuestions =
          await this.surveyQuestionRepository.getSurveyQuestionBySurveyUUID(
            questionSourceSurvey.id,
          );

        const surveyQuestionsPayload = questionSourceQuestions.map(
          (question) => ({
            survey_id: survey.id,
            question_id: question.question_id,
            question_description: question.question_description,
            is_mandatory: question.is_mandatory,
            order: question.order,
          }),
        );

        await this.surveyQuestionRepository.bulkCreate(surveyQuestionsPayload);
      }

      // Commit the transaction if everything is successful
      await queryRunner.commitTransaction();

      return { survey, surveyGroup };
    } catch (error) {
      // Rollback the transaction in case of an error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner after finishing
      await queryRunner.release();
    }
  }

  async getSurveyGroupById(id: number): Promise<SurveyGroup> {
    return await this.surveyGroupRepository.getSurveyGroupById(id);
  }

  async updateSurveyGroupById(survey_group_id, payload) {
    const surveyGroup = await this.getSurveyGroupById(survey_group_id);
    if (!surveyGroup) throw new Error('Survey Not found');

    return await this.surveyGroupRepository.updateSurveyGroup(
      survey_group_id,
      payload,
    );
  }

  async getFilteredSurveys(survey_group_id, payload) {
    const surveyGroup = await this.getSurveyGroupById(survey_group_id);
    if (!surveyGroup) throw new Error('Survey Not found');

    let {
      name,
      abbr = [],
      archive = false,
      page = 1,
      limit = 10,
      order,
      order_column,
      order_column_type = '',
    } = payload.query;
  }

  async createSurveyInSurveyGroup(survey_group_id, payload) {
    const surveyGroup = await this.getSurveyGroupById(survey_group_id);
    if (!surveyGroup) throw new Error('Survey Not found');
    const surveyPayload = {
      survey_group_id: surveyGroup.id,
      name: payload.survey?.name,
      abbr: payload.survey?.abbr,
      options: {
        is_mandatory: payload.survey?.options?.is_mandatory,
        url: payload.survey?.options?.url,
      },
    };

    const survey = await this.surveyService.createSurvey(surveyPayload);

    const questionSourceUUID = payload.survey?.question_source_uuid;

    if (questionSourceUUID) {
      const questionSourceSurvey =
        await this.surveyRepository.getSurveyByUUID(questionSourceUUID);
      if (!questionSourceSurvey) throw new Error('No Source Survey Exists');
      const questionSOurceQuestions =
        await this.surveyQuestionRepository.getSurveyQuestionBySurveyUUID(
          questionSourceSurvey.id,
        );

      const surveyQuestionsPayload = questionSOurceQuestions.map(
        (question) => ({
          survey_id: survey.id,
          question_id: question.question_id,
          question_description: question.question_description,
          is_mandatory: question.is_mandatory,
          order: question.order,
        }),
      );

      await this.surveyQuestionRepository.bulkCreate(surveyQuestionsPayload);
    }
    return survey;
  }
}
