import { Module } from '@nestjs/common';
import { CompaniesService } from './companies/companies.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CompaniesController} from "./companies/companies.controller";
import {TableA} from "./entities/table-a.entity";
import {TableB} from "./entities/table-b.entity";
import {TableC} from "./entities/table-c.entity";
import {CompaniesModule} from "./companies/companies.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'covalis_admin',
      password: 'password',
      database: 'covalis_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TableA, TableB, TableC]),
      CompaniesModule
  ],
})
export class AppModule {}
