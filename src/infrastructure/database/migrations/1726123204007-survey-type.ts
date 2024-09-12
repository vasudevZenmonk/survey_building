import { MigrationInterface, QueryRunner } from "typeorm";

export class SurveyType1726123204007 implements MigrationInterface {
    name = 'SurveyType1726123204007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey-booking" DROP CONSTRAINT "FK_895a34f25c039fb512913a9dbbf"`);
        await queryRunner.query(`CREATE TABLE "survey-type" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "abbr" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "surveyGroupId" integer, CONSTRAINT "PK_2c23f6db43eb647e9db9f054e6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "survey-type" ADD CONSTRAINT "FK_5265c483ad3aacbc4b14dc90b48" FOREIGN KEY ("surveyGroupId") REFERENCES "survey-booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey-booking" ADD CONSTRAINT "FK_895a34f25c039fb512913a9dbbf" FOREIGN KEY ("surveyTypesId") REFERENCES "survey-type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey-booking" DROP CONSTRAINT "FK_895a34f25c039fb512913a9dbbf"`);
        await queryRunner.query(`ALTER TABLE "survey-type" DROP CONSTRAINT "FK_5265c483ad3aacbc4b14dc90b48"`);
        await queryRunner.query(`DROP TABLE "survey-type"`);
        await queryRunner.query(`ALTER TABLE "survey-booking" ADD CONSTRAINT "FK_895a34f25c039fb512913a9dbbf" FOREIGN KEY ("surveyTypesId") REFERENCES "survey-setting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
