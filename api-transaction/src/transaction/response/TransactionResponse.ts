import { ApiProperty } from '@nestjs/swagger';

class ParamWithName {
  @ApiProperty()
  name: string;
}

export class TransactionResponse {
  @ApiProperty()
  transactionExternalId: string;

  @ApiProperty()
  transactionType: ParamWithName;

  @ApiProperty()
  transactionStatus: ParamWithName;

  @ApiProperty()
  value: number;

  @ApiProperty()
  createdAt: string;
}
