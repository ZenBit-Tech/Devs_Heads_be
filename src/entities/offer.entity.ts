import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JobPostEntity } from './jobPost.entity';
import { ProfileEntity } from './profile/profile.entity';

@Entity('offer')
export class OfferEntity {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 10, description: 'Offer price' })
  @Column({ type: 'integer' })
  price: number;

  @ApiProperty({ example: false, description: 'Offer status' })
  @Column({ type: 'boolean', default: false })
  status: boolean;

  @ApiProperty({ example: 'Offer by Alex', description: 'Offer name' })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'Offer start date' })
  @Column({ type: 'datetime' })
  startDate: Date;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'Offer end date' })
  @Column({ type: 'datetime' })
  endDate: Date;

  @ApiProperty({ example: 1, description: 'freelancerId' })
  @Column({ type: 'integer', unique: false })
  @OneToOne(() => ProfileEntity, (profile) => profile.userId)
  freelancerId: number;

  @ApiProperty({ example: 1, description: 'jopPostId' })
  @Column({ type: 'integer', unique: false })
  @OneToOne(() => JobPostEntity, (jopPost: JobPostEntity) => jopPost.id, { cascade: true })
  jopPostId: number;
}
