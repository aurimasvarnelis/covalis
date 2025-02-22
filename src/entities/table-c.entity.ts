import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('table-c')
export class TableC {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ticker: string;

    @Column()
    dataPointC: string;
}