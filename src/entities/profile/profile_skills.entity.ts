import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { SkillsEntity } from './skills.entity';

@Entity('profile_skills')
export class ProfileSkillsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProfileEntity, (profile) => profile.profileSkills)
  @JoinColumn()
  profile: ProfileEntity[];

  @ManyToOne(() => SkillsEntity, (skills) => skills.profileSkills)
  @JoinColumn()
  skills: SkillsEntity[];
}
