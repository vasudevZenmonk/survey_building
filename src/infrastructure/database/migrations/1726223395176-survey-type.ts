import { MigrationInterface, QueryRunner } from "typeorm";

export class SurveyType1726223395176 implements MigrationInterface {
    name = 'SurveyType1726223395176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey-group" DROP CONSTRAINT "FK_fbf40bdf9703163c3da14d7fa14"`);
        await queryRunner.query(`ALTER TABLE "survey-group" RENAME COLUMN "survey_types_id" TO "surveyTypesId"`);
        await queryRunner.query(`ALTER TABLE "survey-group" ADD CONSTRAINT "FK_10c227e966e39e4d2f46ced57bf" FOREIGN KEY ("surveyTypesId") REFERENCES "survey-type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey-group" DROP CONSTRAINT "FK_10c227e966e39e4d2f46ced57bf"`);
        await queryRunner.query(`ALTER TABLE "survey-group" RENAME COLUMN "surveyTypesId" TO "survey_types_id"`);
        await queryRunner.query(`ALTER TABLE "survey-group" ADD CONSTRAINT "FK_fbf40bdf9703163c3da14d7fa14" FOREIGN KEY ("survey_types_id") REFERENCES "survey-type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
