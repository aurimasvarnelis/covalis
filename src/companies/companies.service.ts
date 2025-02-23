import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class CompaniesService {
    constructor(
        private readonly repositoryService: RepositoryService,
    ) {}

    async getCompanyData(ticker: string, dataPoint: string, tableName: string): Promise<any> {
        try {
            return await this.repositoryService.getCompanyDataFromTable(ticker, dataPoint, tableName);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            } else if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
