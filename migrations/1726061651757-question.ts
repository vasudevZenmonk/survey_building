import { MigrationInterface, QueryRunner } from 'typeorm';

export class Question1726061651757 implements MigrationInterface {
  name = 'Question1726061651757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "question" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "question_type_id" character varying NOT NULL, "abbr" character varying NOT NULL, "active" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "questionTypeId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_03ba19afc44b5f7eb70c20944e9" FOREIGN KEY ("questionTypeId") REFERENCES "question_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_03ba19afc44b5f7eb70c20944e9"`,
    );
    await queryRunner.query(`DROP TABLE "question"`);
  }
}
