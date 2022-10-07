import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JobPostEntity } from './jobPost.entity';
import { ProfileEntity } from './profile/profile.entity';

@Entity('offer')
export class OfferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @Column({ type: 'integer' })
  @ManyToOne(() => ProfileEntity, (profile) => profile.userId, { cascade: true })
  freelancerId: number;

  @Column({ type: 'integer' })
  @ManyToOne(() => JobPostEntity, (jopPost: JobPostEntity) => jopPost.id, { cascade: true })
  jopPostId: number;
}
