import { ProfileEntity } from 'src/entities/profile/profile.entity';

export class OfferDto {
  id: number;
  price: number;
  startDate: Date;
  status: string;
  endDate: Date;
  freelancerId: number;
  freelancer: number;
  clientId: number;
  jobPostId: number;
  name: string;
}
