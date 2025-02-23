import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryService } from './repository.service';
import { RulesService } from '../rules/rules.service';
import { EntityManager } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockRulesService = {
    getEntityForTable: jest.fn(),
};

const mockEntityManager = {
    getRepository: jest.fn(),
};

describe('RepositoryService', () => {
    let service: RepositoryService;
    let rulesService: RulesService;
    let entityManager: EntityManager;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RepositoryService,
                { provide: RulesService, useValue: mockRulesService },
                { provide: EntityManager, useValue: mockEntityManager },
            ],
        }).compile();

        service = module.get<RepositoryService>(RepositoryService);
        rulesService = module.get<RulesService>(RulesService);
        entityManager = module.get<EntityManager>(EntityManager);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getCompanyDataFromTable', () => {
        const ticker = 'AAPL';
        const dataPoint = 'price';
        const tableName = 'stocks';
        const tableEntity = 'Stock';

        it('should return the requested data point from the company record', async () => {
            const mockEntity = { ticker: ticker, price: 150 };
            const mockRepository = { findOne: jest.fn().mockResolvedValue(mockEntity) };

            mockRulesService.getEntityForTable.mockResolvedValue(tableEntity);
            mockEntityManager.getRepository.mockReturnValue(mockRepository);

            const result = await service.getCompanyDataFromTable(ticker, dataPoint, tableName);

            expect(result).toEqual({ price: 150 });
            expect(mockRulesService.getEntityForTable).toHaveBeenCalledWith(tableName);
            expect(mockEntityManager.getRepository).toHaveBeenCalledWith(tableEntity);
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { ticker } });
        });

        it('should throw a NotFoundException if the record is not found', async () => {
            const mockRepository = { findOne: jest.fn().mockResolvedValue(null) };

            mockRulesService.getEntityForTable.mockResolvedValue(tableEntity);
            mockEntityManager.getRepository.mockReturnValue(mockRepository);

            await expect(service.getCompanyDataFromTable(ticker, dataPoint, tableName)).rejects.toThrow(
                NotFoundException,
            );
            await expect(service.getCompanyDataFromTable(ticker, dataPoint, tableName)).rejects.toThrow(
                `Record not found in table: ${tableName} for ticker: ${ticker}`,
            );
        });
    });
});
