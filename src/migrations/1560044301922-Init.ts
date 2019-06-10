import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1560044301922 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `issues` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(100) NOT NULL, `description` varchar(200) NOT NULL, `state` varchar(10) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE `issues`');
    }

}
