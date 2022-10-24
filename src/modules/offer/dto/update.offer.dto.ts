import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { Status } from './offer.types';

export class UpdateOfferDto {
  @IsEnum(Status)
  status: Status;

  @IsArray()
  @IsOptional()
  id: number[];
}
