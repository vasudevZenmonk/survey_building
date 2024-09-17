import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestionTypeService } from './create-question-type.service';


@Controller('question-types')
export class CreateQuestionTypeController {
  constructor(
    private readonly createQuestionTypeService: CreateQuestionTypeService,
  ) {}

  @Post('')
  async CreateQuestion(@Body() body) {
    console.log('hello from create QT');
    try {
      return this.createQuestionTypeService.createQuestionType(body);
    } catch (error) {
      throw new Error(error);
    }
  }
}
