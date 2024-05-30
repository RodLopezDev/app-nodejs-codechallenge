export type AntifraudResult = 'rejected' | 'approved';

export interface AntifraudResponse {
  id: string;
  status: AntifraudResult;
}
