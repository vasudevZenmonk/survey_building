import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { surveyStateEnum } from './enum/survey-state.enum';
import { SurveyGroup } from '../survey_group/survey-group.entity';
import { SurveyQuestion } from '../survey_question/survey_question.entity';

@Entity('survey')
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'integer', nullable: true })
  survey_reference_code: number;

  @Column()
  survey_group_id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  abbr: string;

  @Column({
    type: 'enum',
    enum: surveyStateEnum,
    default: surveyStateEnum.IN_CONSTRUCTION,
  })
  state: surveyStateEnum;

  @Column({ type: 'jsonb', nullable: true })
  options: {
    url: string;
    is_mandatory: boolean;
  };

  @Column({ type: 'date', nullable: false, default: () => 'CURRENT_DATE' })
  published_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  publication_status_changed_at: Date;

  @OneToMany(() => SurveyQuestion, (survey_question) => survey_question.surveys)
  survey_question: SurveyQuestion;

  @ManyToOne(() => SurveyGroup, (survey_group) => survey_group.surveys)
  survey_group: SurveyGroup;
}
