import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  getData(ticker: string, dataPoint: string, tableName: string): string {
    return 'Hello World!';
  }
}
