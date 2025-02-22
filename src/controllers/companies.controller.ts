import { Controller, Get, Query } from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Get()
    async getData(
        @Query('ticker') ticker: string,
        @Query('dataPoint') dataPoint: string,
        @Query('tableName') tableName: string,
    ): Promise<string> {
        return this.companiesService.getData(ticker, dataPoint, tableName);
    }
}
