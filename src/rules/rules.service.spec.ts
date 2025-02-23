import {Test, TestingModule} from '@nestjs/testing';
import {RulesService} from './rules.service';
import {NotFoundException} from '@nestjs/common';
import {StockData} from '../entities/stock-data.entity';
import {PriceData} from '../entities/price-data.entity';
import {VolumeData} from '../entities/volume-data.entity';

describe('RulesService', () => {
    let service: RulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RulesService],
        }).compile();

        service = module.get<RulesService>(RulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return StockData entity for stock_data table', async () => {
        const entity = await service.getEntityForTable('stock_data');
        expect(entity).toBe(StockData);
    });

    it('should return PriceData entity for price_data table', async () => {
        const entity = await service.getEntityForTable('price_data');
        expect(entity).toBe(PriceData);
    });

    it('should return VolumeData entity for price_data table', async () => {
        const entity = await service.getEntityForTable('volume_data');
        expect(entity).toBe(VolumeData);
    });

    it('should throw NotFoundException for unknown table', async () => {
        await expect(service.getEntityForTable('unknown_table')).rejects.toThrow(NotFoundException);
    });
});