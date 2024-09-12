import { MigrationInterface, QueryRunner } from "typeorm";

export class SurveyGroup1726125319050 implements MigrationInterface {
    name = 'SurveyGroup1726125319050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey-type" DROP CONSTRAINT "FK_5265c483ad3aacbc4b14dc90b48"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_f1a3149a767266807bfc82be014"`);
        await queryRunner.query(`CREATE TABLE "survey-group" ("id" SERIAL NOT NULL, "survey_type_id" integer NOT NULL, "name" character varying NOT NULL, "abbr" character varying NOT NULL, "options" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "surveyTypesId" integer, CONSTRAINT "PK_55becdfcf4ecf8faa06e3879ac5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "survey-type" ADD CONSTRAINT "FK_5265c483ad3aacbc4b14dc90b48" FOREIGN KEY ("surveyGroupId") REFERENCES "survey-group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey-group" ADD CONSTRAINT "FK_10c227e966e39e4d2f46ced57bf" FOREIGN KEY ("surveyTypesId") REFERENCES "survey-type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_f1a3149a767266807bfc82be014" FOREIGN KEY ("surveyGroupId") REFERENCES "survey-group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_f1a3149a767266807bfc82be014"`);
        await queryRunner.query(`ALTER TABLE "survey-group" DROP CONSTRAINT "FK_10c227e966e39e4d2f46ced57bf"`);
        await queryRunner.query(`ALTER TABLE "survey-type" DROP CONSTRAINT "FK_5265c483ad3aacbc4b14dc90b48"`);
        await queryRunner.query(`DROP TABLE "survey-group"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_f1a3149a767266807bfc82be014" FOREIGN KEY ("surveyGroupId") REFERENCES "survey-booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey-type" ADD CONSTRAINT "FK_5265c483ad3aacbc4b14dc90b48" FOREIGN KEY ("surveyGroupId") REFERENCES "survey-booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
