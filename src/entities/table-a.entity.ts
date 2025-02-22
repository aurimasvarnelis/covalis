import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('table-a')
export class TableA {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ticker: string;

    @Column()
    dataPointA: string;
}