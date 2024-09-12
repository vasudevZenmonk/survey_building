import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SurveyGroup } from '../survey_group/survey-group.entity';

@Entity('survey-type')
export class SurveyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  @Generated('uuid')
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
