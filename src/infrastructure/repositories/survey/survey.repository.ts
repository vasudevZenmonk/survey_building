import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { Survey } from 'src/domain/survey/survey.entity';
import { DataSource, Repository } from 'typeorm';
import { Pagination } from '../common/pagination.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyGroupRepository } from '../survey-group/survey-group.repository';

@Injectable()
export class SurveyRepository extends Repository<Survey> {
  constructor(private dataSource: DataSource) {
    super(Survey, dataSource.createEntityManager());
  }

  async getFilteredSurveys(payload, parameters, archive) {
    const { page, limit, offset } = new Pagination(
      parameters.page,
      parameters.limit,
    );

    const [results, total] = await this.findAndCount({
      where: payload,
      take: limit,
      skip: offset,
    });

    return {
      data: results,
      total,
      current_page: page,
      per_page: limit,
    };
  }

  async getSurveyById(
    survey_uuid: string,
    { get_questions = false, get_survey_group = true } = {},
    archive?: boolean,
  ) {
    const query = this.createQueryBuilder('survey').where(
      'survey.uuid = :uuid',
      { uuid: survey_uuid },
    );

    // if (get_questions) {
    //   query.leftJoinAndSelect('survey.questions', 'questions');
    // }

    if (get_survey_group) {
      query.leftJoinAndSelect('survey.survey_group', 'survey-group');
    }

    if (archive !== undefined) {
      query.andWhere('survey.archived = :archive', { archive });
    }

    const result = await query.getOne();
    return result;
  }

  async getSurveyByUUID(uuid: UUID) {
    return this.findOne({ where: { uuid } });
  }

  async updateSurveyById(survey_uuid, payload) {
    console.log(survey_uuid);

    if (!survey_uuid) {
      throw new Error('survey uuid is not provided');
    }
    const { options = {} } = payload;
    const { is_mandatory, url } = options;
    payload.options = {
      is_mandatory,
      url,
    };

    return this.update({ uuid: survey_uuid }, payload);
  }

  async createSurvey(payload) {
    const { abbr, name, survey_group_id, options = {} } = payload;
    const { is_mandatory } = options;
    const survey = {
      abbr,
      name,
      options: {
        url: null,
        is_mandatory,
      },
      survey_group_id,
    };
    return this.create(survey);
  }

  async publishSurveyById(survey_uuid) {
    const survey = await this.getSurveyById(
      survey_uuid,
      { get_questions: true, get_survey_group: true },
      true
    );

    if (!survey) throw new NotFoundError('Survey not found');
    if (survey.isPublished())
      throw new ConflictError('Survey is already published');
    if (+survey.survey_question.length === 0)
      throw new ForbiddenError(
        'Survey must have at least one question to be published',
      );

    const getSessionKeyResponse = await limeSurveyService.getSessionKey();

    const sessionKey = getSessionKeyResponse.data?.result;

    if (!sessionKey || typeof sessionKey !== 'string') {
      throw new BadGatewayError(
        `An error occurred while getting session key for Lime Survey: ${JSON.stringify(getSessionKeyResponse.data.result)}`,
      );
    }

    const addSurveyResponse = await limeSurveyService.addSurvey(
      sessionKey,
      survey,
      survey.survey_group.options.language,
    );

    const surveyReferenceCode = addSurveyResponse.data?.result;

    if (!surveyReferenceCode || typeof surveyReferenceCode !== 'number') {
      throw new BadGatewayError(
        `An error occurred while adding survey to Lime Survey: ${JSON.stringify(addSurveyResponse.data.result)}`,
      );
    }

    const publishedSurvey = await surveyRepository.findAllSurveyByCriteria(
      { survey_group_id: survey.survey_group_id, status: State.ENUM.PUBLISHED },
      transaction,
    );

    await Promise.all(
      publishedSurvey.map(async (surveyInstance) => {
        surveyInstance.deactivate();
        await surveyRepository.updateSurveyById(
          surveyInstance.uuid,
          surveyInstance.toJSON(),
          transaction,
        );
      }),
    );

    await survey.publish(surveyReferenceCode);
    await surveyRepository.updateSurveyById(
      survey_uuid,
      survey.toJSON(),
      transaction,
    );

    await outboxMessageRepository.initializeOutboxMessage(
      new SurveyPublished(survey),
      transaction,
    );
    await transactionRepository.commitTransaction(transaction);
    return survey;
  }
}
