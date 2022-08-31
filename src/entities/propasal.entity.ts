import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { JobPostEntity } from './jobPost.entity';

@Entity('propasal')
export class ProposalPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobPostEntity, (jobPost) => jobPost.id, { cascade: true })
  jobPost: JobPostEntity;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'varchar', length: 5000 })
  message: string;
}
