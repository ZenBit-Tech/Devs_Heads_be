import { ProfileEntity } from 'src/entities/profile/profile.entity';

export class CategoryDto {
  id: number;
  name: string;
  profile: ProfileEntity;
}
