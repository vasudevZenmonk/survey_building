import { MigrationInterface, QueryRunner } from "typeorm";

export class SurveyType1726223350416 implements MigrationInterface {
    name = 'SurveyType1726223350416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey-group" DROP CONSTRAINT "FK_9752c4d55aeb998dd5753aecb68"`);
        await queryRunner.query(`ALTER TABLE "survey-group" ADD "survey_types_id" integer`);
        await queryRunner.query(`ALTER TABLE "survey-group" ADD CONSTRAINT "FK_fbf40bdf9703163c3da14d7fa14" FOREIGN KEY ("survey_types_id") REFERENCES "survey-type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey-group" DROP CONSTRAINT "FK_fbf40bdf9703163c3da14d7fa14"`);
        await queryRunner.query(`ALTER TABLE "survey-group" DROP COLUMN "survey_types_id"`);
        await queryRunner.query(`ALTER TABLE "survey-group" ADD CONSTRAINT "FK_9752c4d55aeb998dd5753aecb68" FOREIGN KEY ("survey_type_id") REFERENCES "survey-type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
