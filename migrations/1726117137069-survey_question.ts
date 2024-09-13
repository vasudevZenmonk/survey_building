import { MigrationInterface, QueryRunner } from "typeorm";

export class SurveyQuestion1726117137069 implements MigrationInterface {
    name = 'SurveyQuestion1726117137069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "survey_question" ("id" SERIAL NOT NULL, "survey_id" integer NOT NULL, "question_id" integer NOT NULL, "order" integer NOT NULL, "question_description" character varying NOT NULL, "is_mandatory" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "questionsId" integer, "surveysId" integer, CONSTRAINT "PK_ec6d65e83fd7217202178b79907" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "survey_question" ADD CONSTRAINT "FK_b57f7a22121e2abf45d7a98e573" FOREIGN KEY ("questionsId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey_question" ADD CONSTRAINT "FK_fe55aaa48df505b9637d597ef7b" FOREIGN KEY ("surveysId") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_question" DROP CONSTRAINT "FK_fe55aaa48df505b9637d597ef7b"`);
        await queryRunner.query(`ALTER TABLE "survey_question" DROP CONSTRAINT "FK_b57f7a22121e2abf45d7a98e573"`);
        await queryRunner.query(`DROP TABLE "survey_question"`);
    }

}
