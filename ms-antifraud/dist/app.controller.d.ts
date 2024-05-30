import { TransactionMessageDto } from './dto/transaction.dto';
import { AppService } from './app.service';
export declare class AppController {
    private readonly service;
    constructor(service: AppService);
    infoTransaction(dto: TransactionMessageDto): Promise<any>;
}
