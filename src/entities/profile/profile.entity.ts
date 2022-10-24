import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { CategoryEntity } from '../category.entity';
import { EducationEntity } from './education.entity';
import { ExperienceEntity } from './experience.entity';
import { SkillsEntity } from '../skills.entity';
import { User } from '../user.entity';
import { SaveFreelancerEntity } from './favourite.entity';
import { ChatRoom } from '../chat-room.entity';
import { OfferEntity } from '../offer.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OfferEntity, (offer) => offer.freelancerId)
  @JoinColumn()
  offer: OfferEntity[];

  @OneToMany(() => SaveFreelancerEntity, (favourite) => favourite.freelancerId)
  @JoinColumn()
  profile: SaveFreelancerEntity[];

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

  @Column({ type: 'integer' })
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.id)
  userId: number;
}
