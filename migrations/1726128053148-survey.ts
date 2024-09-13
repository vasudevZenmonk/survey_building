import { MigrationInterface, QueryRunner } from "typeorm";

export class Survey1726128053148 implements MigrationInterface {
    name = 'Survey1726128053148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "uuid" DROP DEFAULT`);
    }

}
