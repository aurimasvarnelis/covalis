import { Injectable } from '@nestjs/common';
import {EntityMetadata, Repository} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@Injectable()
export class RepositoryService {
    async getDataFromTable<T extends ObjectLiteral>(
        repo: Repository<T>,
        ticker: string,
        dataPoint: string,
    ): Promise<any> {
        const metadata: EntityMetadata = repo.manager.connection.getMetadata(repo.target);

        const tableName = metadata.tableName;

        const record = await repo.findOne({
            where: { ticker: ticker } as any,
        });

        if (!record) {
            throw new Error(`Record not found in ${tableName}`);
        }

        return { [dataPoint]: record[dataPoint] };
    }
}