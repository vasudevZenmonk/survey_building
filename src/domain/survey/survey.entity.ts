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
import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  isURL,
  IsUrl,
  Length,
} from 'class-validator';
import { OptionsDto } from './dto/options.dto';
import { ConflictException, ForbiddenException } from '@nestjs/common';
import { Abbr } from '../common/value-objects/abbr';
import { Url } from './value-objects/url';

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
  state: surveyStateEnum;

  @Column({
    type: 'jsonb',
    nullable: true,
    transformer: {
      to: (value: any) => {
        return {
          ...value,
          url: new Url(value.url).getValue(),
        };
      },
      from: (value: any) => {
        return value;
      },
    },
  })
  options: {
    url: string;
    is_mandatory: boolean;
  };

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
