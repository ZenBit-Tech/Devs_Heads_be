import { CategoryEntity } from 'src/entities/profile/category.entity';
import { EducationEntity } from 'src/entities/profile/education.entity';
import { ExperiencenEntity } from 'src/entities/profile/experience.entity';
import { ProfileSkillsEntity } from 'src/entities/profile/profile_skills.entity';

export class ProfileDto {
  id?: number;
  photo: string;
  position: string;
  price: number;
  englishLevel: string;
  availible_hours_peer_week: number;
  hour_rate: string;
  description: string;
  category_id: CategoryEntity;
  educations: EducationEntity;
  experience: ExperiencenEntity;
  profileSkills: ProfileSkillsEntity;
}
