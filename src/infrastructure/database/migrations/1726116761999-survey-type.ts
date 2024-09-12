import { MigrationInterface, QueryRunner } from "typeorm";

export class SurveyType1726116761999 implements MigrationInterface {
    name = 'SurveyType1726116761999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "survey-setting" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "name" character varying NOT NULL, "abbr" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_45d2a1feb53f9f767bc00fcc9fb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "survey-setting"`);
    }

}
