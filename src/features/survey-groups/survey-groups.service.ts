import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyGroupRepository } from 'src/infrastructure/repositories/survey-group/survey-group.repository';
import { surveyService } from '../survey/survey.service';

@Injectable()
export class SurveyGroupService {
  constructor(
    @InjectRepository(SurveyGroupRepository)
    private surveyGroupRepository: SurveyGroupRepository,
    private surveyService: surveyService,
  ) {}

  createSurveyGroup = async (payload) => {
    const surveyGroupPayload = {
      name: payload.body?.name,
      survey_type_uuid: payload.body?.survey_type_uuid,
      abbr: payload.body?.abbr,
      options: {
        language: payload.body?.options?.language,
        modality: payload.body?.options?.modality,
      },
    };

    const surveyGroup =
      await this.surveyGroupRepository.createSurveyGroup(surveyGroupPayload);
    //   if(!payload.body?.survey) throw new Error('Survey is required.');

    const surveyPayload = {
      survey_group_id: surveyGroup.id,
      name: payload.body?.survey?.name,
      abbr: payload.body?.survey?.abbr,
      options: {
        is_mandatory: payload.body?.survey?.options?.is_mandatory,
      },
    };

    const survey = await this.surveyService.createSurvey(surveyPayload);

    return { survey, surveyGroup };
  };
}
