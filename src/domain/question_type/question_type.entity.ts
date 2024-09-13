import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from '../question/question.entity';
import { Length } from 'class-validator';
import { Abbr } from '../common/value-objects/abbr';

@Entity()
export class QuestionType {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'uuid' })
  @Generated('uuid')
  uuid: string;

  @Column({ length: 100, nullable: false })
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
  name: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Question, (question) => question.question_type)
  @JoinTable()
  questions: Question[];
}
