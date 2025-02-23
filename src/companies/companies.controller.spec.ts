import {Test, TestingModule} from '@nestjs/testing';
import {CompaniesController} from './companies.controller';
import {CompaniesService} from './companies.service';
import {CacheInterceptor} from '@nestjs/cache-manager';
import {GetDataDto} from './dto/get-data.dto';

describe('CompaniesController', () => {
    let controller: CompaniesController;
    let service: CompaniesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CompaniesController],
            providers: [
                {
                    provide: CompaniesService,
                    useValue: {
                        getCompanyData: jest.fn(),
                    },
                },
            ],
        })
            .overrideInterceptor(CacheInterceptor)
            .useValue({})
            .compile();

        controller = module.get<CompaniesController>(CompaniesController);
        service = module.get<CompaniesService>(CompaniesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getData', () => {
        const query: GetDataDto = {
            ticker: 'AAPL',
            dataPoint: 'price',
            tableName: 'price_data',
        };

        it('should return company data', async () => {
            const expectedResult = 'mocked data';

            jest.spyOn(service, 'getCompanyData').mockResolvedValue(expectedResult);

            const result = await controller.getData(query);

            expect(result).toBe(expectedResult);
            expect(service.getCompanyData).toHaveBeenCalledWith(query.ticker, query.dataPoint, query.tableName);
        });

        it('should call getCompanyData with correct parameters', async () => {
            const getCompanyDataSpy = jest.spyOn(service, 'getCompanyData').mockResolvedValue('mocked data');

            await controller.getData(query);

            expect(getCompanyDataSpy).toHaveBeenCalledWith(query.ticker, query.dataPoint, query.tableName);
        });
    });
});
