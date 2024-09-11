import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from '../question/question.entity';
// import { Question } from "../question/question.entity";

@Entity()
export class QuestionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @Column()
  survey_reference_code: number;

  @Column()
  name?: string;

  @Column()
  abbr?: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @DeleteDateColumn()
  deleted_at: string;

  @OneToMany(() => Question, (question) => question.question_type)
  questions: Question[];
}
