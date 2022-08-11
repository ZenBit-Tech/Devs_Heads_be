import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profileSkills')
export class ProfileSkillsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  skills_id: number;

  @Column({ type: 'integer' })
  profile_id: number;
}
