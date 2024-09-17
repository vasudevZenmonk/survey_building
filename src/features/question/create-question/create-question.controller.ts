import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestionService } from './create-question.service';

@Controller('questions')
export class CreateQuestionController {
  constructor(private readonly questionService: CreateQuestionService) {}

  @Post('')
  async CreateQuestion(@Body() body) {
    try {
      return this.questionService.createQuestion(body);
    } catch (error) {
      throw new Error(error);
    }
  }
}
