import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SurveyGroup } from '../survey_group/survey-group.entity';
import { Abbr } from '../common/value-objects/abbr';
import { IsNotEmpty } from 'class-validator';

@Entity('survey_type')
export class SurveyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  @Generated('uuid')
  @IsNotEmpty()
  uuid: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
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

  @ManyToOne(() => SurveyGroup, (survey_group) => survey_group.survey_types)
  survey_group: SurveyGroup;
}
