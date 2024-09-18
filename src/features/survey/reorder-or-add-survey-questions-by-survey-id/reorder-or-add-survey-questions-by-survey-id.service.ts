import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository } from 'src/infrastructure/repositories/question/question.repository';
import { SurveyQuestionRepository } from 'src/infrastructure/repositories/survey-questions/survey-question.repository';
import { SurveyRepository } from 'src/infrastructure/repositories/survey/survey.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class reorderOrAddSurveyQuestionsBySurveyIdService {
  constructor(
    @InjectRepository(SurveyRepository)
    private surveyRepository: SurveyRepository,
    @InjectRepository(QuestionRepository)
    private questionRepository: QuestionRepository,
    @InjectRepository(SurveyQuestionRepository)
    private surveyQuestionRepository: SurveyQuestionRepository,
    private dataSource: DataSource
  ) {}

  async reorderOrAddSurveyQuestionsBySurveyId(
    survey_uuid: string,
    surveyQuestionsPayload,
  ) {
    // const { survey_uuid } = payload.params;
    // const surveyQuestionsPayload = payload.body;
    console.log(survey_uuid, surveyQuestionsPayload);
    const survey = await this.surveyRepository.findOne({
      where: { uuid: survey_uuid },
    });
    if (!survey) throw new NotFoundError('Survey not found');

    if (survey.isPublished())
      throw new ForbiddenError('Survey is published and cannot be updated');

    const surveyId = survey.id;

    if (
      !Array.isArray(surveyQuestionsPayload) ||
      !surveyQuestionsPayload.length
    )
      throw new InvalidPayloadError('Invalid payload');

    const questionUUIDs = surveyQuestionsPayload.map((question) => {
      if (!question.question_uuid)
        throw new InvalidPayloadError('Invalid payload');
      return question.question_uuid;
    });
    if (new Set(questionUUIDs).size !== surveyQuestionsPayload.length)
      throw new ConflictError('Duplicate question UUIDs found');

    // const questionIds = await surveyQuestionsRepository.sequelize.query(`(SELECT id, uuid FROM "question" WHERE uuid IN(:uuids))`, {
    //   replacements: {
    //     uuids: questionUUIDs
    //   },
    //   type: surveyQuestionsRepository.sequelize.QueryTypes.SELECT
    // }) || [];

    const questionIds = await this.questionRepository
      .createQueryBuilder('question')
      .select(['question.id', 'question.uuid'])
      .where('question.uuid IN (:...uuids)', { uuids: questionUUIDs })
      .getRawMany();

    console.log(questionIds);

    if (questionIds.length !== surveyQuestionsPayload.length)
      throw new InvalidPayloadError('Question does not exist');

    const uuidToIdMap = questionIds.reduce((acc, item) => {
      acc[item.question_uuid] = item.question_id;
      return acc;
    }, {});

    const associatedCountQuery = await this.surveyQuestionRepository
      .createQueryBuilder('sq')
      .select('COUNT(*)')
      .from('survey_question', 'sq')
      .where('sq.survey_id = :survey_id')
      .andWhere('sq.question_id IN (:...ids)')
      .andWhere('sq.deleted_at IS NULL')
      .getQuery();

    const totalCountQuery = await this.surveyQuestionRepository
      .createQueryBuilder('sq')
      .select('COUNT(*)')
      .from('survey_question', 'sq')
      .where('sq.survey_id = :survey_id')
      .andWhere('sq.deleted_at IS NULL')
      .getQuery();

    const [associated_questions] = await this.surveyQuestionRepository
      .createQueryBuilder()
      .select([
        `(${associatedCountQuery}) AS associated_count`,
        `(${totalCountQuery}) AS count`,
      ])
      .setParameters({
        ids: Object.values(uuidToIdMap),
        survey_id: surveyId,
      })
      .getRawOne();

    // const [associated_questions] =
    //   await surveyQuestionsRepository.sequelize.query(
    //     `SELECT
    //     (SELECT COUNT(*) FROM "survey-question" WHERE survey_id = :survey_id AND question_id IN(:ids) AND deleted_at IS NULL) as associated_count,
    //     (SELECT COUNT(*) FROM "survey-question" WHERE survey_id = :survey_id AND deleted_at IS NULL) AS count`,
    //     {
    //       replacements: {
    //         ids: Object.values(uuidToIdMap),
    //         survey_id: surveyId,
    //       },
    //       type: surveyQuestionsRepository.sequelize.QueryTypes.SELECT,
    //     },
    //   );

    if (associated_questions.associated_count !== associated_questions.count)
      throw new InvalidPayloadError('Invalid payload');

    let orderCounter = 0;
    const surveyQuestions = surveyQuestionsPayload.map((question, index) => {
      return {
        survey_id: surveyId,
        question_id: uuidToIdMap[question.question_uuid],
        order: question?.is_deleted ? index + 1 : (orderCounter += 1),
        question_description: question?.question_description?.trim() || null,
        is_mandatory: question?.is_mandatory || false,
        deleted_at: question?.is_deleted ? new Date() : null,
      };
    });

    const queryRunner = this.dataSource.createQueryRunner();

    // Start the transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all(
        surveyQuestions.map((survey_question) =>
          survey_question.deleted_at
            ? this.surveyQuestionRepository.softDeleteSurveyQuestion(
                surveyId,
                survey_question.question_id,
                transaction,
              )
            : surveyQuestionsRepository.createOrUpdateSurveyQuestion(
                surveyId,
                survey_question.question_id,
                survey_question,
                transaction,
              ),
        ),
      );

      await transactionRepository.commitTransaction(transaction);
      return survey;
    } catch (error) {
      await transactionRepository.rollbackTransaction(transaction);
      throw error;
    }
  }
}
