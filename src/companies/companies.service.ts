import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { RulesService } from '../rules/rules.service';

@Injectable()
export class CompaniesService {
    constructor(
        private readonly repositoryService: RepositoryService,
        private readonly rulesService: RulesService,
    ) {}

    async getCompanyData(ticker: string, dataPoint: string, tableName: string): Promise<any> {
        const matchedTableName = await this.rulesService.evaluateTable(tableName);

        return this.repositoryService.getDataFromTable(matchedTableName, ticker, dataPoint);
    }
}
