import { Event } from 'src/domain/common/event/event';

class SurveyCreated extends Event {
  type = 'quality.survey-building.survey_created';

  constructor(payload) {
    super(payload);
  }

  getBody() {
    return {
      survey: {
        uuid: this.payload.getDataValue('uuid'),
        name: this.payload.getDataValue('name'),
        abbr: this.payload.getDataValue('abbr'),
        state: this.payload.getDataValue('state'),
        options: {
          is_mandatory: this.payload.getDataValue('options').is_mandatory,
        },
        created_at: this.payload.getDataValue('created_at'),
      },
    };
  }
}

exports.SurveyCreated = SurveyCreated;
