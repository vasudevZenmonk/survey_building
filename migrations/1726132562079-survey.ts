import { MigrationInterface, QueryRunner } from "typeorm";

export class Survey1726132562079 implements MigrationInterface {
    name = 'Survey1726132562079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "survey_reference_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question_type" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "question_type" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "survey_reference_code" SET NOT NULL`);
    }

}
