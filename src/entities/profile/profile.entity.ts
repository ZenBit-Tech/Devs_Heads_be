import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { EducationEntity } from './education.entity';
import { ExperienceEntity } from './experience.entity';
import { SkillsEntity } from './skills.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  photo: string;

  @Column({ type: 'varchar', length: 255 })
  position: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({
    type: 'enum',
    enum: ['Pre_intermediate', 'Intermediate', 'Upper_intermediate'],
  })
  englishLevel: string;

  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @ManyToOne(() => CategoryEntity, (category) => category.id, { cascade: true })
  category: CategoryEntity;

  @ManyToMany(() => SkillsEntity, { cascade: true })
  @JoinTable()
  skills: SkillsEntity[];

  @OneToMany(() => EducationEntity, (education) => education.profile, { cascade: true })
  education: EducationEntity[];

  @OneToMany(() => ExperienceEntity, (experience) => experience.profile, { cascade: true })
  experience: ExperienceEntity[];
}
