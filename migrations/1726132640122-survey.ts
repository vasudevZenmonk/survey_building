import { MigrationInterface, QueryRunner } from "typeorm";

export class Survey1726132640122 implements MigrationInterface {
    name = 'Survey1726132640122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "state" SET DEFAULT 'in_construction'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "state" DROP DEFAULT`);
    }

}
