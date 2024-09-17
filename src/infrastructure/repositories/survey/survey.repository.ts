import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { Survey } from 'src/domain/survey/survey.entity';
import { DataSource, Repository } from 'typeorm';
import { Pagination } from '../common/pagination.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyGroupRepository } from '../survey-group/survey-group.repository';
import { getSessionKey } from 'src/features/common/lime-survey/get-session-key';
import { addSurvey } from 'src/features/common/lime-survey/add-session';

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

  async findAllSurveyByCriteria(criteria: any = {}) {
    const { survey_group_id, status } = criteria || {};

    const whereCondition: any = {};

    if (survey_group_id) {
      whereCondition.survey_group_id = survey_group_id;
    }

    if (status) {
      whereCondition.status = status;
    }

    return this.find({
      where: whereCondition,
    });
  }
}
