import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { GetDataDto } from './dto/get-data.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Get()
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async getData(
        @Query() query: GetDataDto,
    ): Promise<string> {
        const { ticker, dataPoint, tableName } = query;
        return this.companiesService.getCompanyData(ticker, dataPoint, tableName);
    }
}
