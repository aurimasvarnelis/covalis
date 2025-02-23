import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('price_data')
export class PriceData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 10 })
    ticker: string;  // Stock symbol (AAPL, GOOGL, etc.)

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;  // Current price of the stock

    @Column({ type: 'date' })
    date: string;  // Date when the price was recorded
}
