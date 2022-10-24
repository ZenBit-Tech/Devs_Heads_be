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
import { ApiProperty } from '@nestjs/swagger';
import { JobPostEntity } from './jobPost.entity';
import { ProfileEntity } from './profile/profile.entity';
import { User } from './user.entity';

@Entity('offer')
export class OfferEntity {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 10, description: 'Offer price' })
  @Column({ type: 'integer' })
  price: number;

  @ApiProperty({ enum: Status, description: 'Offer status' })
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @ApiProperty({ example: 'Offer by Alex', description: 'Offer name' })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'Offer start date' })
  @Column({ type: 'datetime' })
  startDate: Date;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'Offer end date' })
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
