import { IsEmpty } from "class-validator";

export class createSurveyDto {
  survey_group_id: number;
  name: string;
  abbr: string;
  options: {
    is_mandatory: boolean;
    url: string;
  };
}

export class UpdateSurveyDto {
  @IsEmpty()
  survey_group_id: number;

  @IsEmpty()
  name: string;

  @IsEmpty()
  abbr: string;

  @IsEmpty()
  options: {
    is_mandatory: boolean;
    url: string;
  };
}
