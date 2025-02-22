import { Controller, Get, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Get()
    async getData(
        @Query('ticker') ticker: string,
        @Query('dataPoint') dataPoint: string,
        @Query('tableName') tableName: string,
    ): Promise<string> {
        return this.companiesService.getCompanyData(ticker, dataPoint, tableName);
    }
}
