import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyTypeModule } from './features/survey-types/survey-types.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { SurveyGroupModule } from './features/survey-groups/survey-groups.module';
import { SurveyModule } from './features/survey/survey.module';
import { QuestionTypeModule } from './features/question-type/question-type.module';
import { QuestionModule } from './features/question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    SurveyTypeModule,
    SurveyGroupModule,
    SurveyModule,
    QuestionModule,
    QuestionTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
