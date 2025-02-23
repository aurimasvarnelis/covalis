import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class RefactorStockTables1640254000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('table-a');
        await queryRunner.dropTable('table-b');
        await queryRunner.dropTable('table-c');

        await queryRunner.createTable(
            new Table({
                name: 'price_data',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'ticker', type: 'varchar', length: '10' },
                    { name: 'price', type: 'decimal', precision: 10, scale: 2 },
                    { name: 'date', type: 'date' },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'stock_data',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'ticker', type: 'varchar', length: '10' },
                    { name: 'open', type: 'decimal', precision: 10, scale: 2 },
                    { name: 'close', type: 'decimal', precision: 10, scale: 2 },
                    { name: 'high', type: 'decimal', precision: 10, scale: 2 },
                    { name: 'low', type: 'decimal', precision: 10, scale: 2 },
                    { name: 'date', type: 'date' },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'volume_data',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'ticker', type: 'varchar', length: '10' },
                    { name: 'volume', type: 'bigint' },
                    { name: 'date', type: 'date' },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('stock_data');
        await queryRunner.dropTable('price_data');
        await queryRunner.dropTable('volume_data');
    }
}
