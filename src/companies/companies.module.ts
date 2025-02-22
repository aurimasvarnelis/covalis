import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { RepositoryModule } from '../repository/repository.module';
import { RulesModule } from '../rules/rules.module';

@Module({
    imports: [RepositoryModule, RulesModule],
    providers: [CompaniesService],
    controllers: [CompaniesController],
})

export class CompaniesModule {}
