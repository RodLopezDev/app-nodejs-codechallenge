import { AntifraudResult } from 'src/common/configs';

export interface TransactionResponse {
  id: string;
  status: AntifraudResult;
}
