import { Injectable } from '@nestjs/common';
import { SurveyGroup } from 'src/domain/survey_group/survey-group.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SurveyGroupRepository extends Repository<SurveyGroup> {
  constructor(private dataSource: DataSource) {
    super(SurveyGroup, dataSource.createEntityManager());
  }

  async createSurveyGroup (payload) {
    return await this.save(payload);
  }

  async getSurveyGroupById (id: number) {
    return this.findOne({where: {id}});
  }

}
