import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SurveyType } from '../survey-type/survey-type.entity';
import { Survey } from '../survey/survey.entity';
import { surveyGroupOptionEnum } from './enum/survey_group_option.enum';
import { surveyGroupLanguageEnum } from './enum/survey_group_language.enum';

@Entity('survey-booking')
export class SurveyGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  survey_type_id: number;

  @Column()
  name: string;

  @Column()
  abbr: string;

  @Column()
  options: {
    modality: surveyGroupOptionEnum;
    language: surveyGroupLanguageEnum;
  };

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @DeleteDateColumn()
  deleted_at: string;

  @ManyToOne(() => SurveyType, (survey_type) => survey_type.survey_group)
  survey_types: SurveyType[];

  @OneToMany(() => Survey, (survey) => survey.survey_group)
  surveys: Survey[];
}
