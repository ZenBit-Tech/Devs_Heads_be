import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { EnglishLevelEntity } from './english_level.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  user_id: number;

  @Column({ type: 'blob' })
  photo: string;

  @Column({ type: 'varchar', length: 255 })
  position: string;

  @OneToMany(() => CategoryEntity, (category) => category.id)
  @JoinColumn()
  category: CategoryEntity[];

  @Column({ type: 'varchar', length: 255 })
  price: string;

  @Column({ type: 'integer' })
  availible_hours_peer_week: number;

  @Column({ type: 'varchar', length: 255 })
  hour_rate: string;

  @OneToMany(() => EnglishLevelEntity, (english_level) => english_level.id)
  @Column()
  english_level: EnglishLevelEntity[];

  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @Column({ type: 'varchar', length: 1000 })
  education: string;

  @Column({ type: 'varchar', length: 1000 })
  experience: string;
}
