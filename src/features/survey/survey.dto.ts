export class createSurveyDto {
     survey_group_id: number;
     name: string;
     abbr: string;
     options: {
        is_mandatory: boolean
     }
}