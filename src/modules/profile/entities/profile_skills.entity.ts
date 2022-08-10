import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profileSkills')
export class ProfileSkillsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skills_id: number;

  @Column()
  profile_id: number;
}
