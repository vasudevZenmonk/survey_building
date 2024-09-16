import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyGroup } from 'src/domain/survey_group/survey-group.entity';
import { DataSource, Repository } from 'typeorm';
import { Pagination } from '../common/pagination.repository';
import { UUID } from 'crypto';

@Injectable()
export class SurveyGroupRepository extends Repository<SurveyGroup> {
  constructor(private dataSource: DataSource) {
    super(SurveyGroup, dataSource.createEntityManager());
  }

  async getFilteredSurveyGroups(payload, parameters, archive) {
    const { page, limit, offset } = new Pagination(
      parameters.page,
      parameters.limit,
    );

    // const relations = ['survey_types'];

    const [results, total] = await this.findAndCount({
      where: payload,
      // relations: ['survey_type'],
      // loadRelationIds: true,
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

  async createSurveyGroup(payload) {
    return await this.save(payload);
  }

  async getSurveyGroupById(id: number) {
    return this.findOne({ where: { id } });
  }

  async updateSurveyGroup(criteria, payload) {
    return this.update(criteria, payload);
  }
}
