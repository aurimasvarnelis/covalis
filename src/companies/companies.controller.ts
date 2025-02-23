import {Controller, Get, Query, UseInterceptors, UsePipes, ValidationPipe} from '@nestjs/common';
import {CompaniesService} from './companies.service';
import {GetDataDto} from './dto/get-data.dto';
import {CacheInterceptor} from "@nestjs/cache-manager";

@Controller('companies')
@UseInterceptors(CacheInterceptor)
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {
    }

    @Get()
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
    async getData(
        @Query() query: GetDataDto,
    ): Promise<string> {
        const {ticker, dataPoint, tableName} = query;
        return this.companiesService.getCompanyData(ticker, dataPoint, tableName);
    }
}
