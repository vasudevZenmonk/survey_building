import { Injectable } from '@nestjs/common';
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
}
