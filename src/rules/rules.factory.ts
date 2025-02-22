import { Engine } from 'json-rules-engine';

export function createRulesEngine(): Engine {
    const engine = new Engine();

    const tables = ['TableA', 'TableB', 'TableC'];

    tables.forEach((tableName) => {
        engine.addRule({
            conditions: {
                all: [{ fact: 'tableName', operator: 'equal', value: tableName }],
            },
            event: {
                type: 'repository',
                params: { tableName },
            },
        });
    });

    return engine;
}
