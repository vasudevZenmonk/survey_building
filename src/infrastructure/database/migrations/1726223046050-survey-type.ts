import { MigrationInterface, QueryRunner } from "typeorm";

export class SurveyType1726223046050 implements MigrationInterface {
    name = 'SurveyType1726223046050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey-group" DROP CONSTRAINT "FK_10c227e966e39e4d2f46ced57bf"`);
        await queryRunner.query(`ALTER TABLE "survey-group" DROP COLUMN "surveyTypesId"`);
        await queryRunner.query(`ALTER TABLE "survey-group" ADD CONSTRAINT "FK_9752c4d55aeb998dd5753aecb68" FOREIGN KEY ("survey_type_id") REFERENCES "survey-type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey-group" DROP CONSTRAINT "FK_9752c4d55aeb998dd5753aecb68"`);
        await queryRunner.query(`ALTER TABLE "survey-group" ADD "surveyTypesId" integer`);
        await queryRunner.query(`ALTER TABLE "survey-group" ADD CONSTRAINT "FK_10c227e966e39e4d2f46ced57bf" FOREIGN KEY ("surveyTypesId") REFERENCES "survey-type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
