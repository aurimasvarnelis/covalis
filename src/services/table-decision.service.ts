import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Engine } from 'json-rules-engine';
import { TableA } from '../entities/table-a.entity'
import { TableB } from '../entities/table-b.entity'
import { TableC } from '../entities/table-c.entity'

@Injectable()
export class TableDecisionService {
    constructor(private readonly entityManager: EntityManager) {}

    async getRepository(tableName: string) {
        const engine = new Engine();

        engine.addRule({
            conditions: { all: [{ fact: 'tableName', operator: 'equal', value: 'tableA' }] },
            event: { type: 'tableA', params: { repository: TableA } },
        });

        engine.addRule({
            conditions: { all: [{ fact: 'tableName', operator: 'equal', value: 'tableB' }] },
            event: { type: 'tableB', params: { repository: TableB } },
        });

        engine.addRule({
            conditions: { all: [{ fact: 'tableName', operator: 'equal', value: 'tableC' }] },
            event: { type: 'tableC', params: { repository: TableC } },
        });

        const facts = { tableName };
        const results = await engine.run(facts);

        const event = results.events[0];
        if (!event) {
            throw new NotFoundException('No valid table found');
        }

        const repository = event.params?.repository;
        if (!repository) {
            throw new NotFoundException('Repository not found in event');
        }

        return this.entityManager.getRepository(repository);
    }
}
