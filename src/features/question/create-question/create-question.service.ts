import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionTypeRepository } from 'src/infrastructure/repositories/question-type/question-type.repository';
import { QuestionRepository } from 'src/infrastructure/repositories/question/question.repository';

@Injectable()
export class CreateQuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private questionRepository: QuestionRepository,

    @InjectRepository(QuestionTypeRepository)
    private questionTypeRepository: QuestionTypeRepository,
  ) {}

  async createQuestion(payload) {
    const questionWithSameDescription =
      await this.questionRepository.getQuestionByDescription(
        payload.description,
      );
    if (questionWithSameDescription)
      throw new ConflictError('Question with same description already exists');

    const { question_type_uuid, ...values } = payload;
    const question_type =
      await this.questionTypeRepository.findByUUID(question_type_uuid);

    if (!question_type) {
      throw new Error('question type not found');
    }

    const response = await this.questionRepository.createQuestion({
      ...values,
      question_type_id: question_type.id,
    });

    console.log(response);

    if (response)
      return this.questionRepository.getQuestionByUuid(response.uuid);
    else return null;
  }
}
