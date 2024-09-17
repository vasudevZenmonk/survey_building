import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SurveyType } from '../survey-type/survey-type.entity';
import { Survey } from '../survey/survey.entity';
import { surveyGroupOptionEnum } from './enum/survey_group_option.enum';
import { surveyGroupLanguageEnum } from './enum/survey_group_language.enum';
import { Abbr } from '../common/value-objects/abbr';
import { Length } from 'class-validator';
import { Option } from './value-objects/options';

@Entity('survey_group')
export class SurveyGroup {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  survey_type_id: number;

  @Column({ length: 100, nullable: false })
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    transformer: {
      to: (value: string) => {
        return new Abbr(value).getValue();
      },
      from: (value: string) => {
        return value;
      },
    },
  })
  abbr: string;

  @Column({
    type: 'jsonb',
    nullable: false,
    transformer: {
      to: (value: string) => {
        return new Option(value).getValue();
      },
      from: (value: string) => {
        return value;
      },
    },
  })
  options: {
    modality: surveyGroupOptionEnum;
    language: surveyGroupLanguageEnum;
  };

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @ManyToOne(() => SurveyType, (survey_type) => survey_type.survey_group)
  @JoinColumn({ name: 'survey_type_id' })
  survey_types: SurveyType[];

  @OneToMany(() => Survey, (survey) => survey.survey_group)
  surveys: Survey[];
}
