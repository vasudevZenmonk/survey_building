import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { surveyStateEnum } from './enum/survey-state.enum';
import { SurveyGroup } from '../survey_group/survey-group.entity';
import { SurveyQuestion } from '../survey_question/survey_question.entity';
import { IsBoolean, IsEmpty, IsNotEmpty, isURL, IsUrl, Length } from 'class-validator';
import { OptionsDto } from './dto/options.dto';

@Entity('survey')
export class Survey {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'char', nullable: false })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'int', nullable: true })
  survey_reference_code: number;

  @Column({ type: 'int', nullable: false })
  survey_group_id: number;

  @Column({ type: 'text', nullable: false })
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
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
  options: OptionsDto;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;


  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_DATE' })
  published_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  publication_status_changed_at: Date;
  
  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => SurveyQuestion, (survey_question) => survey_question.surveys)
  survey_question: SurveyQuestion;

  @ManyToOne(() => SurveyGroup, (survey_group) => survey_group.surveys)
  survey_group: SurveyGroup;
}
