import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  accountExternalIdDebit: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  accountExternalIdCredit: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  tranferTypeId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  value: number;
}
