import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeStateType1560207286159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `issues` MODIFY COLUMN `state` enum ('open', 'pending', 'closed') NOT NULL DEFAULT 'open'");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `issues` MODIFY COLUMN `state` varchar(10) NOT NULL');
    }

}
