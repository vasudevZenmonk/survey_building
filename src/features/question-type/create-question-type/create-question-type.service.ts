import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionType } from 'src/domain/question_type/question_type.entity';
import { QuestionTypeRepository } from 'src/infrastructure/repositories/question-type/question-type.repository';
import { CreateQuestionTypeDto } from './create-question-type.dto';

@Injectable()
export class CreateQuestionTypeService {
  constructor(
    @InjectRepository(QuestionTypeRepository)
    private questionTypeRepository: QuestionTypeRepository,
  ) {}

  async createQuestionType(payload): Promise<QuestionType> {
    return this.questionTypeRepository.createQuestiontype(payload);
  }
}
