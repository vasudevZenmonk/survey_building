import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { surveyStateEnum } from './enum/survey-state.enum';
import { SurveyGroup } from '../survey_group/survey-group.entity';
import { SurveyQuestion } from '../survey_question/survey_question.entity';
import { IsEnum, Length } from 'class-validator';
import { ConflictException, ForbiddenException } from '@nestjs/common';
import { Abbr } from '../common/value-objects/abbr';
import { Options } from './value-objects/options';
import { OptionsInterface } from './interface/option.interface';

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

  @Column({
    type: 'enum',
    enum: surveyStateEnum,
    default: surveyStateEnum.IN_CONSTRUCTION,
  })
  @IsEnum(surveyStateEnum, { message: 'Invalid survey state' })
  state: surveyStateEnum;

  @Column({
    type: 'jsonb',
    nullable: false,
    transformer: {
      to: (value: Options) => ({
        url: value.getUrl(),
        is_mandatory: value.isMandatory(),
      }),
      from: (value: any) => value,
    },
  })
  options: OptionsInterface;

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

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_DATE' })
  published_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  publication_status_changed_at: Date;

  @OneToMany(() => SurveyQuestion, (survey_question) => survey_question.survey)
  survey_questions: SurveyQuestion[];

  @ManyToOne(() => SurveyGroup, (survey_group) => survey_group.surveys)
  @JoinColumn({ name: 'survey_group_id' })
  survey_group: SurveyGroup;

  /**
   * Set survey URL based on reference code.
   */
  setUrl(surveyReferenceCode: number) {
    this.options.url = `${process.env.LIME_SURVEY_URL}/${surveyReferenceCode}`;
  }

  /**
   * Check if the survey is published.
   */
  isPublished(): boolean {
    return this.state === surveyStateEnum.PUBLISHED;
  }

  /**
   * Check if the survey is deactivated.
   */
  isDeactivated(): boolean {
    return this.state === surveyStateEnum.DEACTIVATED;
  }

  /**
   * Publish a survey.
   */
  publish(surveyReferenceCode: number) {
    if (this.isPublished()) {
      throw new ConflictException('Survey is already published');
    }
    if (this.isDeactivated()) {
      throw new ForbiddenException('Survey is deactivated');
    }
    if (!this.published_at) {
      this.published_at = new Date();
    }

    this.setUrl(surveyReferenceCode);
    this.survey_reference_code = surveyReferenceCode;
    this.state = surveyStateEnum.PUBLISHED;
    this.publication_status_changed_at = new Date();
  }

  /**
   * Deactivate a survey.
   */
  deactivate() {
    if (this.isDeactivated()) {
      throw new ConflictException('Survey is already deactivated');
    }
    if (!this.isPublished()) {
      throw new ForbiddenException('Survey is not published yet');
    }
    this.state = surveyStateEnum.DEACTIVATED;
    this.publication_status_changed_at = new Date();
  }
}
