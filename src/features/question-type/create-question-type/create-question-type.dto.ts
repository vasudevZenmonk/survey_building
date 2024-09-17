import { IsNotEmpty } from 'class-validator';

export class CreateQuestionTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  abbr: string;
}
