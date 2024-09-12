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
import { QuestionType } from '../question_type/question_type.entity';
import { SurveyQuestion } from '../survey_question/survey_question.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  @Generated('uuid')
  uuid: string;

  @Column()
  question_type_id: string;

  @Column()
  abbr: string;

  @Column()
  active: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @DeleteDateColumn()
  deleted_at: string;

  @ManyToOne(() => QuestionType, (question_type) => question_type.questions)
  question_type: QuestionType;

    @OneToMany(
      () => SurveyQuestion,
      (survey_question) => survey_question.questions,
    )
    survey_question: SurveyQuestion;
}
