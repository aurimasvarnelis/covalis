import { Injectable } from '@nestjs/common';
import { EntityManager, Repository, ObjectLiteral } from 'typeorm';
import { RulesService } from '../rules/rules.service';

@Injectable()
export class RepositoryService {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly rulesService: RulesService,
    ) {}

    async getDataFromTable(tableName: string, ticker: string, dataPoint: string): Promise<any> {
        const matchedTableName = await this.rulesService.evaluateTable(tableName);

        const repo = this.getRepositoryByName(matchedTableName);

        const record = await repo.findOne({ where: { ticker } as any });

        if (!record) {
            throw new Error(`Record not found in table: ${matchedTableName}`);
        }

        return { [dataPoint]: record[dataPoint] };
    }

    private getRepositoryByName<T extends ObjectLiteral>(tableName: string): Repository<T> {
        try {
            return this.entityManager.getRepository(tableName) as Repository<T>;
        } catch (error) {
            throw new Error(`Repository not found for table: ${tableName}`);
        }
    }
}
