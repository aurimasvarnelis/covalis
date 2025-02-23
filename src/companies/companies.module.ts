import {Module} from '@nestjs/common';
import {CompaniesService} from './companies.service';
import {CompaniesController} from './companies.controller';
import {RepositoryModule} from '../repository/repository.module';
import {RulesModule} from '../rules/rules.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [CacheModule.register(
        {
            ttl: 600,
            max: 100,
        }
    ), RepositoryModule, RulesModule],
    providers: [CompaniesService],
    controllers: [CompaniesController],
})

export class CompaniesModule {
}
