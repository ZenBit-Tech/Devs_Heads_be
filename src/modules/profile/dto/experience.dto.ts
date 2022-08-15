import { ProfileEntity } from 'src/entities/profile/profile.entity';

export class ExperienceDto {
  id?: number;
  description: string;
  startDate: Date;
  endDate: Date;
  profile: ProfileEntity;
}
