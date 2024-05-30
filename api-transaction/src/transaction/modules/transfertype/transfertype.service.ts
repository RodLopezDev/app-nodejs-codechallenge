import { Injectable } from '@nestjs/common';

@Injectable()
export class TransferTypeService {
  types: { id: number; name: string }[] = [
    { id: 1, name: 'Transfer' },
    { id: 2, name: 'Payment' },
    { id: 3, name: 'Yape-Payment' },
  ];

  findOne(typeId: number) {
    return this.types.find((t) => t.id === typeId);
  }
}
