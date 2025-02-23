import {IsNotEmpty, IsString} from 'class-validator';

export class GetDataDto {
    @IsString()
    @IsNotEmpty({message: 'Ticker is required'})
    ticker: string;

    @IsString()
    @IsNotEmpty({message: 'Data point is required'})
    dataPoint: string;

    @IsString()
    @IsNotEmpty({message: 'Table name is required'})
    tableName: string;
}
