import { Injectable } from '@nestjs/common';
import { Question } from 'src/domain/question/question.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuestionRepository extends Repository<Question> {
  constructor(private dataSource: DataSource) {
    super(Question, dataSource.createEntityManager());
  }

  async createQuestion(payload) {
    const { abbr, description, active, question_type_id } = payload;
    console.log(payload);
    const question = {
      abbr,
      description,
      active,
      question_type_id,
    };
    const res= await this.save(question);
    console.log(res);
    return res;
  }

  async getQuestionByDescription(description: string) {
    return this.findOne({ where: { description } });
  }

  async getQuestionByUuid(uuid: string) {
    return this.findOne({ where: { uuid: uuid } });
  }
}
