import {Module} from '@nestjs/common';
import {RepositoryService} from './repository.service';
import {RulesModule} from '../rules/rules.module';

@Module({
    imports: [RulesModule],
    providers: [RepositoryService],
    exports: [RepositoryService],
})

export class RepositoryModule {
}
