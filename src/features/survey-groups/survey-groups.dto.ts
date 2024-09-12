import { UUID } from 'crypto';
import { createSurveyDto } from '../survey/survey.dto';

export class CreateSurveyGroupDto {
    
  name: string;
  abbr: string;
  options: {
    modality: string;
    language: string;
  };
  survey_type_uuid: UUID;
  survey: createSurveyDto;
}
