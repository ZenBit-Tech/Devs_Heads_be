import { CategoryEntity } from 'src/entities/profile/category.entity';
import { EducationEntity } from 'src/entities/profile/education.entity';
import { ExperienceEntity } from 'src/entities/profile/experience.entity';
import { SkillsEntity } from 'src/entities/profile/skills.entity';

export class ProfileDto {
  photo: string;
  position: string;
  price: number;
  englishLevel: string;
  description: string;
  category: CategoryEntity;
  education: EducationEntity[];
  experience: ExperienceEntity[];
  skills: SkillsEntity[];
}
