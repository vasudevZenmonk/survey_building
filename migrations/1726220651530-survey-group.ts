import { MigrationInterface, QueryRunner } from "typeorm";

export class SurveyGroup1726220651530 implements MigrationInterface {
    name = 'SurveyGroup1726220651530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_03ba19afc44b5f7eb70c20944e9"`);
        await queryRunner.query(`ALTER TABLE "question_type" DROP COLUMN "survey_reference_code"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "questionTypeId"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "question_type" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "question_type" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question_type" ADD CONSTRAINT "UQ_fcfcb1fc824f0a58ff131fee7a3" UNIQUE ("abbr")`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "UQ_6930ce56f7294538e3751b9f32a" UNIQUE ("uuid")`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "question_type_id"`);
        await queryRunner.query(`ALTER TABLE "question" ADD "question_type_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "UQ_a381ed27987a28a78ce6d2a2cc2" UNIQUE ("abbr")`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "question" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "published_at"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "published_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "survey-group" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "survey-group" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey-group" ADD CONSTRAINT "UQ_6e8cfc39d99ba95b30e0d0d52ea" UNIQUE ("abbr")`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_1266d0d727621c5ede6660609e1" FOREIGN KEY ("question_type_id") REFERENCES "question_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_1266d0d727621c5ede6660609e1"`);
        await queryRunner.query(`ALTER TABLE "survey-group" DROP CONSTRAINT "UQ_6e8cfc39d99ba95b30e0d0d52ea"`);
        await queryRunner.query(`ALTER TABLE "survey-group" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "survey-group" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "published_at"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "published_at" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "question" ADD "active" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "UQ_a381ed27987a28a78ce6d2a2cc2"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "question_type_id"`);
        await queryRunner.query(`ALTER TABLE "question" ADD "question_type_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "UQ_6930ce56f7294538e3751b9f32a"`);
        await queryRunner.query(`ALTER TABLE "question_type" DROP CONSTRAINT "UQ_fcfcb1fc824f0a58ff131fee7a3"`);
        await queryRunner.query(`ALTER TABLE "question_type" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "question_type" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "question" ADD "questionTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "question_type" ADD "survey_reference_code" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_03ba19afc44b5f7eb70c20944e9" FOREIGN KEY ("questionTypeId") REFERENCES "question_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
