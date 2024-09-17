import { Module } from '@nestjs/common';
import { CreateQuestionModule } from './create-question/create-question.module';
// import { CreateQuestionTypeService } from '../question-type/create-question-type/create-question-type.service';

@Module({
  imports: [CreateQuestionModule],
  providers: [],
  exports: [],
})
export class QuestionModule {}
