import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('volume_data')
export class VolumeData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 10})
    ticker: string;  // Stock symbol (AAPL, GOOGL, etc.)

    @Column('bigint')
    volume: number;  // Trading volume

    @Column({type: 'date'})
    date: string;  // Date when the volume was recorded
}
