import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { SkillsEntity } from 'src/entities/profile/skills.entity';

export class ProfileSkillsDto {
  id: number;
  profile: ProfileEntity;
  skills: SkillsEntity;
}
