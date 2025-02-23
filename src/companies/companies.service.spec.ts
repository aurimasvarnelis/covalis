import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { RepositoryService } from '../repository/repository.service';
import { NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';

const mockRepositoryService = {
    getCompanyDataFromTable: jest.fn(),
};

describe('CompaniesService', () => {
    let service: CompaniesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompaniesService,
                {
                    provide: RepositoryService,
                    useValue: mockRepositoryService,
                },
            ],
        }).compile();

        service = module.get<CompaniesService>(CompaniesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getCompanyData', () => {
        const ticker = 'AAPL';
        const dataPoint = 'price';
        const tableName = 'stocks';

        it('should return company data from repository service', async () => {
            const expectedData = { ticker: ticker, price: 150 };

            mockRepositoryService.getCompanyDataFromTable.mockResolvedValue(expectedData);

            const result = await service.getCompanyData(ticker, dataPoint, tableName);

            expect(result).toBe(expectedData);
            expect(mockRepositoryService.getCompanyDataFromTable).toHaveBeenCalledWith(
                ticker,
                dataPoint,
                tableName,
            );
        });

        it('should throw NotFoundException if repository service throws a NotFoundException', async () => {
            const expectedError = new NotFoundException('Data not found');

            mockRepositoryService.getCompanyDataFromTable.mockRejectedValue(expectedError);

            await expect(service.getCompanyData(ticker, dataPoint, tableName)).rejects.toThrow(
                NotFoundException,
            );
        });

        it('should throw BadRequestException if repository service throws a BadRequestException', async () => {
            const expectedError = new BadRequestException('Bad request');

            mockRepositoryService.getCompanyDataFromTable.mockRejectedValue(expectedError);

            await expect(service.getCompanyData(ticker, dataPoint, tableName)).rejects.toThrow(
                BadRequestException,
            );
        });

        it('should throw InternalServerErrorException for all other errors', async () => {
            const expectedError = new Error('Unknown error');

            mockRepositoryService.getCompanyDataFromTable.mockRejectedValue(expectedError);

            await expect(service.getCompanyData(ticker, dataPoint, tableName)).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });
});
