import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileSkillsEntity } from './profile_skills.entity';

@Entity('skills')
export class SkillsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => ProfileSkillsEntity, (profileSkills) => profileSkills.skills_id)
  profileSkills: ProfileSkillsEntity;
}
