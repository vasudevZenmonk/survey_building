import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Survey } from '../survey/survey.entity';
import { Question } from '../question/question.entity';
import { IsEmpty, IsNotEmpty } from 'class-validator';

@Entity('survey_question')
export class SurveyQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  @IsNotEmpty()
  survey_id: number;

  @Column({ type: 'int' })
  @IsNotEmpty()
  question_id: number;

  @Column({ type: 'int' })
  @IsNotEmpty()
  order: number;

  @Column({ type: 'text' })
  @IsEmpty()
  question_description: string;

  @Column({ type: 'boolean', default: false })
  @IsNotEmpty()
  is_mandatory: boolean;

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

  @ManyToOne(() => Question, (question) => question.survey_questions)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => Survey, (survey) => survey.survey_questions)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;
}
