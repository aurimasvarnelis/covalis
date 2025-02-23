import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedStockData1640256000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO price_data (ticker, price, date)
            VALUES ('AAPL', 150.00, '2025-02-01'),
                   ('GOOGL', 2800.00, '2025-02-01'),
                   ('MSFT', 300.00, '2025-02-01');
        `);

        await queryRunner.query(`
            INSERT INTO stock_data (ticker, open, close, high, low, date)
            VALUES ('AAPL', 145.00, 150.00, 155.00, 144.00, '2025-02-01'),
                   ('GOOGL', 2750.00, 2800.00, 2850.00, 2740.00, '2025-02-01'),
                   ('MSFT', 295.00, 300.00, 305.00, 290.00, '2025-02-01');
        `);

        await queryRunner.query(`
            INSERT INTO volume_data (ticker, volume, date)
            VALUES ('AAPL', 10000000, '2025-02-01'),
                   ('GOOGL', 5000000, '2025-02-01'),
                   ('MSFT', 20000000, '2025-02-01');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE
            FROM price_data
            WHERE ticker IN ('AAPL', 'GOOGL', 'MSFT');
        `);

        await queryRunner.query(`
            DELETE
            FROM stock_data
            WHERE ticker IN ('AAPL', 'GOOGL', 'MSFT');
        `);

        await queryRunner.query(`
            DELETE
            FROM volume_data
            WHERE ticker IN ('AAPL', 'GOOGL', 'MSFT');
        `);
    }
}
