import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SurveyGroup } from '../survey_group/survey-group.entity';

@Entity('survey-setting')
export class SurveyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @Column()
  name: string;

  @Column()
  abbr: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @DeleteDateColumn()
  deleted_at: string;

  @ManyToOne(() => SurveyGroup, (survey_group) => survey_group.survey_types)
  survey_group: SurveyGroup;
}
