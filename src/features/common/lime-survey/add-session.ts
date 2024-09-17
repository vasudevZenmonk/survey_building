import axios from 'axios';

const LimeSurveyLanguageMapping = {
  es_ES: 'es',
  pt_BR: 'pt-BR',
  pt_PT: 'pt',
  en_US: 'en',
  it_IT: 'it',
  fr_FR: 'fr',
  zh_CN: 'zh-Hans',
};

export const addSurvey = async (sSessionKey, survey, language) => {
  const params = {
    sSessionKey: sSessionKey,
    iSurveyID: survey.uuid,
    sSurveyTitle: survey.name,
    sSurveyLanguage: LimeSurveyLanguageMapping[language],
    sformat: 'A',
  };
  try {
    return await axios.post(
      `${process.env.LIME_SURVEY_URL}/admin/remotecontrol`,
      {
        method: 'add_survey',
        params: params,
        id: 2,
      },
      {
        timeout: 10000, // Timeout duration set to 10 seconds
      },
    );
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new GatewayTimeoutError('The request to add the survey timed out');
    } else {
      throw new BadGatewayError(
        'An error occurred while trying to add the survey',
      );
    }
  }
};
