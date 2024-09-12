import { Injectable } from "@nestjs/common";
import { SurveyQuestion } from "src/domain/survey_question/survey_question.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SurveyQuestionRepository extends Repository<SurveyQuestion> {
    constructor(private dataSource: DataSource) {
        super(SurveyQuestion, dataSource.createEntityManager())
    }

    async getSurveyQuestionBySurveyUUID (survey_id:  number): Promise<SurveyQuestion[]> {

        return this.find({where: {survey_id}});
    }

    async bulkCreate ( payload ): Promise<SurveyQuestion[]> {
        return this.save(payload);
    }

}