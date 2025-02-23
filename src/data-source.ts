import 'dotenv/config';
import {DataSource} from 'typeorm';
import {PriceData} from "./entities/price-data.entity";
import {StockData} from "./entities/stock-data.entity";
import {VolumeData} from "./entities/volume-data.entity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'your_user',
    password: process.env.DB_PASS || 'your_password',
    database: process.env.DB_NAME || 'your_db',
    entities: [PriceData, StockData, VolumeData],
    migrations: ['src/migrations/*.ts'],
    logging: true,
});