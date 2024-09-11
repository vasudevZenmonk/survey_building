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
import { Survey } from '../survey/survey.entity';
import { Question } from '../question/question.entity';

@Entity('survey_question')
export class SurveyQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  survey_id: number;

  @Column()
  question_id: number;

  @Column()
  order: number;

  @Column()
  question_description: string;

  @Column()
  is_mandatory: boolean;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @DeleteDateColumn()
  deleted_at: string;

  @ManyToOne(() => Question, (question) => question.survey_question)
  questions: Question[];

  @ManyToOne(() => Survey, (survey) => survey.survey_question)
  surveys: Survey[];
}
