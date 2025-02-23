import {Injectable, NotFoundException} from '@nestjs/common';
import {Engine} from 'json-rules-engine';
import {StockData} from '../entities/stock-data.entity';
import {PriceData} from '../entities/price-data.entity';
import {VolumeData} from '../entities/volume-data.entity';

@Injectable()
export class RulesService {
    private readonly engine: Engine;

    constructor() {
        this.engine = new Engine();
        this.setupRules();
    }

    async getEntityForTable(tableName: string): Promise<any> {
        const {events} = await this.engine.run({tableName});

        if (!events.length || !events[0].params?.entity) {
            throw new NotFoundException(`Entity not found for table: ${tableName}`);
        }

        return events[0].params.entity;
    }

    private setupRules() {
        const entities = [
            {table: 'stock_data', entity: StockData},
            {table: 'price_data', entity: PriceData},
            {table: 'volume_data', entity: VolumeData},
        ];

        entities.forEach(({table, entity}) => {
            this.engine.addRule({
                conditions: {
                    all: [{fact: 'tableName', operator: 'equal', value: table}],
                },
                event: {
                    type: 'entity',
                    params: {entity},
                },
            });
        });
    }
}
