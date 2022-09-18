import { CategoryEntity } from 'src/entities/category.entity';
import { EducationEntity } from 'src/entities/profile/education.entity';
import { ExperienceEntity } from 'src/entities/profile/experience.entity';
import { SkillsEntity } from 'src/entities/skills.entity';
import { User } from 'src/entities/user.entity';

export class ProfileDto {
  photo: string;
  userId: number;
  user: User[];
  position: string;
  price: number;
  englishLevel: string;
  description: string;
  category: CategoryEntity;
  education: EducationEntity[];
  experience: ExperienceEntity[];
  skills: SkillsEntity[];
}
