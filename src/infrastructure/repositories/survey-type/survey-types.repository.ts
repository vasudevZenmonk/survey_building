import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { SurveyType } from 'src/domain/survey-type/survey-type.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SurveyTypeRepository extends Repository<SurveyType> {
  constructor(private dataSource: DataSource) {
    super(SurveyType, dataSource.createEntityManager());
  }

  async findAllSurveyTypes() {
    return this.find();
  }

  async getSurveyType(uuid: string) {
    return this.findOne({ where: { uuid } });
  }

  async findByUUID(uuid: SurveyType) {
    console.log(uuid);
    return this.getId(uuid);
  }
  async createSurveyType(payload) {
    return this.save(payload);
  }
}
