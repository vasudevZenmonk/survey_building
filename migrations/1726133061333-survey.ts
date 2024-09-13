import { MigrationInterface, QueryRunner } from "typeorm";

export class Survey1726133061333 implements MigrationInterface {
    name = 'Survey1726133061333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "published_at"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "published_at" date NOT NULL DEFAULT ('now'::text)::date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "published_at"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "published_at" TIMESTAMP NOT NULL`);
    }

}
