import { MigrationInterface, QueryRunner } from "typeorm";

export class Survey1726117019966 implements MigrationInterface {
    name = 'Survey1726117019966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."survey_state_enum" AS ENUM('in_construction', 'published', 'deactivated')`);
        await queryRunner.query(`CREATE TABLE "survey" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "survey_reference_code" integer NOT NULL, "survey_group_id" integer NOT NULL, "name" character varying NOT NULL, "abbr" character varying NOT NULL, "state" "public"."survey_state_enum" NOT NULL, "options" jsonb, "published_at" TIMESTAMP NOT NULL, "publication_status_changed_at" TIMESTAMP NOT NULL, "surveyGroupId" integer, CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_f1a3149a767266807bfc82be014" FOREIGN KEY ("surveyGroupId") REFERENCES "survey-booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_f1a3149a767266807bfc82be014"`);
        await queryRunner.query(`DROP TABLE "survey"`);
        await queryRunner.query(`DROP TYPE "public"."survey_state_enum"`);
    }

}
