import { MigrationInterface, QueryRunner } from "typeorm";

export class SurveyGroup1726116859749 implements MigrationInterface {
    name = 'SurveyGroup1726116859749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "survey-booking" ("id" SERIAL NOT NULL, "survey_type_id" integer NOT NULL, "name" character varying NOT NULL, "abbr" character varying NOT NULL, "options" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "surveyTypesId" integer, CONSTRAINT "PK_f80a23f3672c6738ec3f7f745ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "survey-setting" ADD "surveyGroupId" integer`);
        await queryRunner.query(`ALTER TABLE "survey-setting" ADD CONSTRAINT "FK_d06603a9d9139f9ad44b0c787c4" FOREIGN KEY ("surveyGroupId") REFERENCES "survey-booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey-booking" ADD CONSTRAINT "FK_895a34f25c039fb512913a9dbbf" FOREIGN KEY ("surveyTypesId") REFERENCES "survey-setting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey-booking" DROP CONSTRAINT "FK_895a34f25c039fb512913a9dbbf"`);
        await queryRunner.query(`ALTER TABLE "survey-setting" DROP CONSTRAINT "FK_d06603a9d9139f9ad44b0c787c4"`);
        await queryRunner.query(`ALTER TABLE "survey-setting" DROP COLUMN "surveyGroupId"`);
        await queryRunner.query(`DROP TABLE "survey-booking"`);
    }

}
