import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skills')
export class SkillsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
