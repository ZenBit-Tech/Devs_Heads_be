import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { EnglishLevelEntity } from './english_level.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  photo: string;

  @Column()
  position: string;

  @OneToMany(() => CategoryEntity, (category) => category.id)
  @JoinColumn()
  category: CategoryEntity[];

  @Column()
  price: string;

  @Column()
  availible_hours_peer_week: number;

  @Column()
  hour_rate: string;

  @OneToMany(() => EnglishLevelEntity, (english_level) => english_level.id)
  @Column()
  english_level: EnglishLevelEntity[];

  @Column()
  description: string;

  @Column()
  education: string;

  @Column()
  experience: string;
}
