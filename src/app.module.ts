import { Module } from '@nestjs/common';
import { CompaniesService } from './services/companies.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CompaniesController} from "./controllers/companies.controller";
import {TableA} from "./entities/table-a.entity";
import {TableB} from "./entities/table-b.entity";
import {TableC} from "./entities/table-c.entity";

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
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class AppModule {}
