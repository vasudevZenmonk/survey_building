import { MigrationInterface, QueryRunner } from "typeorm";

export class SurveyGroup1726223434462 implements MigrationInterface {
    name = 'SurveyGroup1726223434462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey-type" DROP CONSTRAINT "FK_5265c483ad3aacbc4b14dc90b48"`);
        await queryRunner.query(`ALTER TABLE "survey-type" RENAME COLUMN "surveyGroupId" TO "survey_type_id"`);
        await queryRunner.query(`ALTER TABLE "survey-type" ADD CONSTRAINT "FK_9baa2d889bfd941d89e5c363c72" FOREIGN KEY ("survey_type_id") REFERENCES "survey-group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey-type" DROP CONSTRAINT "FK_9baa2d889bfd941d89e5c363c72"`);
        await queryRunner.query(`ALTER TABLE "survey-type" RENAME COLUMN "survey_type_id" TO "surveyGroupId"`);
        await queryRunner.query(`ALTER TABLE "survey-type" ADD CONSTRAINT "FK_5265c483ad3aacbc4b14dc90b48" FOREIGN KEY ("surveyGroupId") REFERENCES "survey-group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
