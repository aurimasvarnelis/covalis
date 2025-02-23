import {Injectable, NotFoundException} from '@nestjs/common';
import {EntityManager} from 'typeorm';
import {RulesService} from "../rules/rules.service";

@Injectable()
export class RepositoryService {
    constructor(
        private readonly rulesService: RulesService,
        private readonly entityManager: EntityManager,
    ) {
    }

    async getCompanyDataFromTable(ticker: string, dataPoint: string, tableName: string): Promise<any> {
        const entity = await this.rulesService.getEntityForTable(tableName);

        const repository = this.entityManager.getRepository(entity);

        let record = await repository.findOne({where: {ticker} as any});

        if (!record) {
            throw new NotFoundException(`Record not found in table: ${tableName} for ticker: ${ticker}`);
        }

        return {[dataPoint]: record[dataPoint]};
    }
}
