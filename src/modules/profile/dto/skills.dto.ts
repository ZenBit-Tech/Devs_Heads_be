import { ProfileSkillsEntity } from 'src/entities/profile/profile_skills.entity';

export class SkillsDto {
  id: number;
  name: string;
  profileSkills: ProfileSkillsEntity;
}
