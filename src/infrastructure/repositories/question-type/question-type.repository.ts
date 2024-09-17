import { Injectable } from '@nestjs/common';
import { QuestionType } from 'src/domain/question_type/question_type.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuestionTypeRepository extends Repository<QuestionType> {
  constructor(private dataSource: DataSource) {
    super(QuestionType, dataSource.createEntityManager());
  }
  async findByUUID(uuid: string) {
    return this.findOne({where: {uuid}});
  }

  async createQuestiontype (payload ) {
    return this.save(payload);
  }
}
