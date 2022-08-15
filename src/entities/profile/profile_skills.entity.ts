import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { SkillsEntity } from './skills.entity';

@Entity('profile_skills')
export class ProfileSkillsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id)
  @JoinColumn()
  profile_id: ProfileEntity;

  @ManyToOne(() => SkillsEntity, (skills) => skills.id)
  @JoinColumn()
  skills_id: SkillsEntity[];
}
