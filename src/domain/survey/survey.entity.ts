import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { surveyStateEnum } from './enum/survey-state.enum';
import { SurveyQuestion } from '../survey_question/survey_question.entity';
import { SurveyGroup } from '../survey_group/survey-group.entity';

@Entity('survey')
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @Column()
  survey_reference_code: number;

  @Column()
  survey_group_id: number;

  @Column({ type: 'string', nullable: false })
  name: string;

  @Column({ type: 'string', nullable: false })
  abbr: string;

  @Column({ type: 'enum', enum: surveyStateEnum })
  state: string;

  @Column()
  options: {
    url: string;
    is_mandatory: boolean;
  };

  @Column({ type: 'datetime' })
  published_at: string;

  @Column({ type: 'datetime' })
  publication_status_changed_at: string;

  @OneToMany(() => SurveyQuestion, (survey_question) => survey_question.surveys)
  survey_question: SurveyQuestion;

  @ManyToOne(() => SurveyGroup, (survey_group) => survey_group.surveys)
  survey_group: SurveyGroup;
}
