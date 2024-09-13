import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsNotEmpty, IsUUID, Length, IsIn } from 'class-validator';
import { QuestionType } from '../question_type/question_type.entity';
import { SurveyQuestion } from '../survey_question/survey_question.entity';
import { UUID } from 'crypto';
import { Abbr } from '../common/value-objects/abbr';

@Entity()
export class Question {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'char', unique: true })
  @Generated('uuid')
  @IsUUID()
  uuid: UUID;

  @Column({ type: 'int' })
  @IsNotEmpty({ message: 'Question type ID is required' })
  question_type_id: string;

  @Column({
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

  @Column({ type: 'boolean', default: true })
  @IsBoolean({ message: 'Active must be a boolean' })
  @IsNotEmpty({ message: 'Active is required' })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => QuestionType, (question_type) => question_type.questions)
  @JoinColumn({ name: 'question_type_id' })
  question_type: QuestionType;

  @OneToMany(
    () => SurveyQuestion,
    (survey_question) => survey_question.questions,
  )
  survey_question: SurveyQuestion;
}
