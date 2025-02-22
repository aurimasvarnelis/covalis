import { Injectable } from '@nestjs/common';
import { Engine } from 'json-rules-engine';
import { createRulesEngine } from './rules.factory';

@Injectable()
export class RulesService {
    private readonly engine: Engine;

    constructor() {
        this.engine = createRulesEngine();
    }

    async evaluateTable(tableName: string): Promise<string> {
        const { events } = await this.engine.run({ tableName });

        if (!events.length || !events[0].params?.tableName) {
            throw new Error(`Invalid table name: ${tableName}`);
        }

        return events[0].params.tableName;
    }
}
