import { IsArray, IsEnum } from 'class-validator';
import { Status } from './offer.types';

export class UpdateOfferDto {
  @IsEnum(Status)
  status: Status;

  @IsArray()
  id: number[];
}
