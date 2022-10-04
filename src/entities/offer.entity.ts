import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JobPostEntity } from './jobPost.entity';
import { ProfileEntity } from './profile/profile.entity';

@Entity('offer')
export class OfferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @Column({ type: 'integer' })
  @OneToOne(() => ProfileEntity, (profile) => profile.id, { cascade: true })
  freelancerId: number;

  @Column({ type: 'integer' })
  @OneToOne(() => JobPostEntity, (jopPost: JobPostEntity) => jopPost.id, { cascade: true })
  jopPostId: number;
}
