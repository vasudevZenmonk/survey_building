import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { Survey } from 'src/domain/survey/survey.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SurveyRepository extends Repository<Survey> {
  constructor(private dataSource: DataSource) {
    super(Survey, dataSource.createEntityManager());
  }

  async createSurvey(payload) {
    return this.save(payload);
  }

  async getSurveyById(id: number) {
    return this.findOne({ where: { id } });
  }

  async getSurveyByUUID(uuid: UUID) {
    return this.findOne({ where: { uuid } });
  }
}
