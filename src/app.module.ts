import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CompaniesModule} from "./companies/companies.module";
import {AppDataSource} from "./data-source";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot(AppDataSource.options),
        CompaniesModule
    ],
})

export class AppModule {
}
