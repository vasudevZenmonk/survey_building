import { MigrationInterface, QueryRunner } from 'typeorm';

export class SurveyGroup1726567687229 implements MigrationInterface {
  name = 'SurveyGroup1726567687229';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "survey_type" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "abbr" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "surveyGroupId" integer, CONSTRAINT "UQ_f6615fef15d63e9e8bb0e30b70d" UNIQUE ("abbr"), CONSTRAINT "PK_4008aa53f3435e26c3b162d3c2d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "survey_group" ("id" SERIAL NOT NULL, "survey_type_id" integer NOT NULL, "name" character varying(100) NOT NULL, "abbr" character varying NOT NULL, "options" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_0ca4ffee8b413e754eb90e38d32" UNIQUE ("abbr"), CONSTRAINT "PK_396b30a4f08048d6b27953c5e52" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."survey_state_enum" AS ENUM('in_construction', 'published', 'deactivated')`,
    );
    await queryRunner.query(
      `CREATE TABLE "survey" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "survey_reference_code" integer, "survey_group_id" integer NOT NULL, "name" text NOT NULL, "abbr" character varying NOT NULL, "state" "public"."survey_state_enum" NOT NULL DEFAULT 'in_construction', "options" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "published_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::date, "publication_status_changed_at" TIMESTAMP, CONSTRAINT "UQ_c90a8161568cb49c1a3f1498f69" UNIQUE ("abbr"), CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question_type" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "abbr" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_fcfcb1fc824f0a58ff131fee7a3" UNIQUE ("abbr"), CONSTRAINT "PK_8ee0ca6ea5ac1770d54b7ff5ca4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "question_type_id" integer NOT NULL, "description" text NOT NULL, "abbr" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_6930ce56f7294538e3751b9f32a" UNIQUE ("uuid"), CONSTRAINT "UQ_a381ed27987a28a78ce6d2a2cc2" UNIQUE ("abbr"), CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "survey_question" ("id" SERIAL NOT NULL, "survey_id" integer NOT NULL, "question_id" integer NOT NULL, "order" integer NOT NULL, "question_description" text NOT NULL, "is_mandatory" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_ec6d65e83fd7217202178b79907" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."outbox_message_status_enum" AS ENUM('pending', 'sent')`,
    );
    await queryRunner.query(
      `CREATE TABLE "outbox_message" ("id" SERIAL NOT NULL, "message_id" character(36) NOT NULL, "type" character(255) NOT NULL, "headers" json, "properties" json NOT NULL, "body" json NOT NULL, "status" "public"."outbox_message_status_enum" NOT NULL, "sent_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_452f044f9b3436b9fcfa3f8f520" UNIQUE ("message_id"), CONSTRAINT "PK_2f36ee5236f2793f3e7bd554589" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey_type" ADD CONSTRAINT "FK_1491b7f92a89bf203712992a2ab" FOREIGN KEY ("surveyGroupId") REFERENCES "survey_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey_group" ADD CONSTRAINT "FK_4270d8d6ee0d98c9686406b61a3" FOREIGN KEY ("survey_type_id") REFERENCES "survey_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey" ADD CONSTRAINT "FK_4cf7f1d45d99f7c0bcf74d3b24c" FOREIGN KEY ("survey_group_id") REFERENCES "survey_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_1266d0d727621c5ede6660609e1" FOREIGN KEY ("question_type_id") REFERENCES "question_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey_question" ADD CONSTRAINT "FK_fb9bce581ae2d2299c4e5b6ef1e" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey_question" ADD CONSTRAINT "FK_347ae83807bbdfc2e91c5c51ec8" FOREIGN KEY ("survey_id") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "survey_question" DROP CONSTRAINT "FK_347ae83807bbdfc2e91c5c51ec8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey_question" DROP CONSTRAINT "FK_fb9bce581ae2d2299c4e5b6ef1e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_1266d0d727621c5ede6660609e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey" DROP CONSTRAINT "FK_4cf7f1d45d99f7c0bcf74d3b24c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey_group" DROP CONSTRAINT "FK_4270d8d6ee0d98c9686406b61a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey_type" DROP CONSTRAINT "FK_1491b7f92a89bf203712992a2ab"`,
    );
    await queryRunner.query(`DROP TABLE "outbox_message"`);
    await queryRunner.query(`DROP TYPE "public"."outbox_message_status_enum"`);
    await queryRunner.query(`DROP TABLE "survey_question"`);
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(`DROP TABLE "question_type"`);
    await queryRunner.query(`DROP TABLE "survey"`);
    await queryRunner.query(`DROP TYPE "public"."survey_state_enum"`);
    await queryRunner.query(`DROP TABLE "survey_group"`);
    await queryRunner.query(`DROP TABLE "survey_type"`);
  }
}
