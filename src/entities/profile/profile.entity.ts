import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { CategoryEntity } from '../category.entity';
import { EducationEntity } from './education.entity';
import { ExperienceEntity } from './experience.entity';
import { SkillsEntity } from '../skills.entity';
import { SettingEntity } from './setting-profile.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
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

  @OneToMany(() => SettingEntity, (setting) => setting.userId)
  @JoinTable()
  setting: SettingEntity[];

  @Column({ type: 'integer' })
  @JoinTable()
  @OneToOne(() => SettingEntity, (setting) => setting.id, { cascade: true })
  userId: number;
}
