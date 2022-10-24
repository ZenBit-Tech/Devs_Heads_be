import { ApiProperty } from '@nestjs/swagger';
import { DateOrders } from './offer.types';

export class FindContractDto {
  @ApiProperty({ required: false })
  date?: DateOrders;

  @ApiProperty({ required: false })
  status?: string;
}
