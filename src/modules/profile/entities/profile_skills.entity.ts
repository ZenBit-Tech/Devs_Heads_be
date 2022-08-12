import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { SkillsEntity } from './skills.entity';

@Entity('profileSkills')
export class ProfileSkillsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id)
  @JoinColumn()
  profile_id: ProfileEntity[];

  @OneToMany(() => SkillsEntity, (skills) => skills.id)
  @JoinColumn()
  skills_id: SkillsEntity[];
}
