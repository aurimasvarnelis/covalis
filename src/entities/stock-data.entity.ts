import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('stock_data')
export class StockData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 10 })
    ticker: string;  // Stock symbol (AAPL, GOOGL, etc.)

    @Column('decimal', { precision: 10, scale: 2 })
    open: number;  // Opening price

    @Column('decimal', { precision: 10, scale: 2 })
    close: number;  // Closing price

    @Column('decimal', { precision: 10, scale: 2 })
    high: number;  // Highest price of the day

    @Column('decimal', { precision: 10, scale: 2 })
    low: number;  // Lowest price of the day

    @Column({ type: 'date' })
    date: string;  // Date when the data was recorded
}
