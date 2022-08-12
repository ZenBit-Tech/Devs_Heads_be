import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('experience')
export class ExperiencenEntity {
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id)
  @JoinColumn()
  user_id: ProfileEntity[];
}
