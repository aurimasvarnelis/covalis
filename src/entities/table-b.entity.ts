import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('table-b')
export class TableB {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ticker: string;

    @Column()
    dataPointB: string;
}