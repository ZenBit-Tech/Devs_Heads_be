import { Status } from 'src/modules/offer/dto/offer.types';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientSettingsEntity } from './clientSetttings.entity';
import { JobPostEntity } from './jobPost.entity';
import { ProfileEntity } from './profile/profile.entity';
import { User } from './user.entity';

@Entity('offer')
export class OfferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  price: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @Column({ type: 'integer', unique: false })
  @ManyToOne(() => JobPostEntity, (jobPost) => jobPost.id, { cascade: true })
  @JoinColumn({ name: 'jobPostId' })
  jobPostId: number;

  @Column({ type: 'integer', unique: false })
  @JoinColumn({ name: 'freelancerId' })
  @ManyToOne(() => ProfileEntity, (profile) => profile.offer)
  freelancerId: ProfileEntity;

  @Column({ type: 'integer', unique: false })
  @OneToOne(() => ClientSettingsEntity, (clientInfo) => clientInfo.userId)
  clientId: number;
}
