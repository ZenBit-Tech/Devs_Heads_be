import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('experience')
export class ExperiencenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id)
  @JoinColumn()
  profile: ProfileEntity;
}
