import { Module } from '@nestjs/common';
import { CreateQuestionController } from 'src/features/question/create-question/create-question.controller';
import { CreateQuestionService } from 'src/features/question/create-question/create-question.service';
import { QuestionTypeRepository } from 'src/infrastructure/repositories/question-type/question-type.repository';
import { QuestionRepository } from 'src/infrastructure/repositories/question/question.repository';

@Module({
  controllers: [CreateQuestionController],
  providers: [
    CreateQuestionService,
    QuestionTypeRepository,
    QuestionRepository,
  ],
})
export class CreateQuestionTypeModule {}
