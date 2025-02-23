import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class InitialData1740253783989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'table-a',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'ticker', type: 'varchar' },
                    { name: 'dataPointA', type: 'varchar' },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'table-b',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'ticker', type: 'varchar' },
                    { name: 'dataPointB', type: 'varchar' },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'table-c',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'ticker', type: 'varchar' },
                    { name: 'dataPointC', type: 'varchar' },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('table-a');
        await queryRunner.dropTable('table-b');
        await queryRunner.dropTable('table-c');
    }

}
