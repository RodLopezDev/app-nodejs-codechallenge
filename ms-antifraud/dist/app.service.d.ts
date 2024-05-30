import { TransactionMessageDto } from './dto/transaction.dto';
export declare class AppService {
    validate(dto: TransactionMessageDto): {
        id: string;
        status: string;
    };
}
