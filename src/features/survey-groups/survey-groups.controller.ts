import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SurveyGroupService } from './survey-groups.service';
import { CreateSurveyGroupDto } from './survey-groups.dto';
import { TransactionInterceptor } from 'src/infrastructure/interceptor/transaction.interceptor';

@Controller('survey-groups')
@UseInterceptors(TransactionInterceptor)
export class SurveyGroupController {
  constructor(private readonly surveyGroupService: SurveyGroupService) {}

  @Get('')
  async getFilteredSurveyGroup(
    @Query('name') name: string,
    @Query('abbr') abbr: string,
    @Query('type') type: string,
  ) {
    try {
      const response = await this.surveyGroupService.getFilteredSurveyGroups({
        name,
        abbr,
        type,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  @Post('')
  async createSurveyGroup(@Body() body: CreateSurveyGroupDto) {
    return this.surveyGroupService.createSurveyGroup(body);
  }
}
