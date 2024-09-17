import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyRepository } from 'src/infrastructure/repositories/survey/survey.repository';
import { createSurveyDto } from './survey.dto';
import { Survey } from 'src/domain/survey/survey.entity';
import { UUID } from 'crypto';
import { getSessionKey } from '../common/lime-survey/get-session-key';
import { addSurvey } from '../common/lime-survey/add-session';
import { surveyStateEnum } from 'src/domain/survey/enum/survey-state.enum';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { SurveyPublished } from 'src/domain/survey/events/survey-published';

@Injectable()
export class surveyService {
  constructor(
    @InjectRepository(SurveyRepository)
    private surveyRepository: SurveyRepository,
    @InjectRepository(OutboxMessageRepository)
    private outboxMessageRepository: OutboxMessageRepository,
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

  async publishSurveyById(survey_uuid) {
    const survey = await this.surveyRepository.getSurveyById(
      survey_uuid,
      { get_questions: true, get_survey_group: true },
      true,
    );

    if (!survey) throw new NotFoundError('Survey not found');
    if (survey.isPublished())
      throw new ConflictError('Survey is already published');
    if (+survey.survey_questions.length === 0)
      throw new ForbiddenError(
        'Survey must have at least one question to be published',
      );

    const getSessionKeyResponse = await getSessionKey();

    const sessionKey = getSessionKeyResponse.data?.result;

    if (!sessionKey || typeof sessionKey !== 'string') {
      throw new BadGatewayError(
        `An error occurred while getting session key for Lime Survey: ${JSON.stringify(getSessionKeyResponse.data.result)}`,
      );
    }

    const addSurveyResponse = await addSurvey(
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

    const publishedSurvey = await this.surveyRepository.findAllSurveyByCriteria(
      {
        survey_group_id: survey.survey_group_id,
        status: surveyStateEnum.PUBLISHED,
      },
    );

    await Promise.all(
      publishedSurvey.map(async (surveyInstance) => {
        surveyInstance.deactivate();
        await this.surveyRepository.updateSurveyById(
          surveyInstance.uuid,
          surveyInstance,
        );
      }),
    );

    await survey.publish(surveyReferenceCode);
    await this.surveyRepository.updateSurveyById(survey_uuid, survey);

    await this.outboxMessageRepository.initializeOutboxMessage(
      new SurveyPublished(survey),
    );
    return survey;
  }
}
