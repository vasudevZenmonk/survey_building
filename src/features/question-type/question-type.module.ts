import { Module } from '@nestjs/common';
import { CreateQuestionTypeController } from './create-question-type/create-question-type.controller';
import { CreateQuestionTypeService } from './create-question-type/create-question-type.service';
import { QuestionTypeRepository } from 'src/infrastructure/repositories/question-type/question-type.repository';

@Module({
  imports: [],
  controllers: [CreateQuestionTypeController],
  providers: [CreateQuestionTypeService, QuestionTypeRepository],
  exports: [],
})
export class QuestionTypeModule {}
