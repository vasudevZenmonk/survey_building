import { MigrationInterface, QueryRunner } from "typeorm";

export class Survey1726133162342 implements MigrationInterface {
    name = 'Survey1726133162342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "publication_status_changed_at" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "publication_status_changed_at" SET NOT NULL`);
    }

}
