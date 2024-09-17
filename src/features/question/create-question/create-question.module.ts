import { Module } from '@nestjs/common';
import { CreateQuestionController } from './create-question.controller';
import { CreateQuestionService } from './create-question.service';
import { QuestionRepository } from 'src/infrastructure/repositories/question/question.repository';
import { QuestionTypeRepository } from 'src/infrastructure/repositories/question-type/question-type.repository';

@Module({
  controllers: [CreateQuestionController],
  providers: [
    CreateQuestionService,
    QuestionRepository,
    QuestionTypeRepository,
  ],
})
export class CreateQuestionModule {}
