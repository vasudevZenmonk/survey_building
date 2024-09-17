import { Event } from 'src/domain/common/event/event';

export class SurveyPublished extends Event {
  type = 'quality.survey-building.survey_published';

  constructor(payload) {
    super(payload);
  }

  getBody() {
    return {
      survey: {
        uuid: this.payload.getDataValue('uuid'),
        survey_reference_code: this.payload.getDataValue(
          'survey_reference_code',
        ),
        name: this.payload.getDataValue('name'),
        abbr: this.payload.getDataValue('abbr'),
        state: this.payload.getDataValue('state'),
        options: this.payload.getDataValue('options'),
        published_at: this.payload.getDataValue('published_at'),
        publication_status_changed_at: this.payload.getDataValue(
          'publication_status_changed_at',
        ),
        created_at: this.payload.getDataValue('created_at'),
        updated_at: this.payload.getDataValue('updated_at'),
      },
    };
  }
}

