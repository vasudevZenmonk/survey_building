import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuestionType1726061450286 implements MigrationInterface {
  name = 'QuestionType1726061450286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "question_type" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "survey_reference_code" integer NOT NULL, "name" character varying NOT NULL, "abbr" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_8ee0ca6ea5ac1770d54b7ff5ca4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "question_type"`);
  }
}
