import { Injectable } from '@nestjs/common';
import {TableDecisionService} from "./table-decision.service";
import {RepositoryService} from "./repository.service";

@Injectable()
export class CompaniesService {
  constructor(
      private readonly tableDecisionService: TableDecisionService,
      private readonly repositoryService: RepositoryService,
  ) {}

    async getData(companyTicker: string, dataPoint: string, tableName: string): Promise<any> {
        const repository = await this.tableDecisionService.getRepository(tableName);

        return this.repositoryService.getDataFromTable(repository, companyTicker, dataPoint);
    }
}
