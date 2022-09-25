import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { JobPostEntity } from 'src/entities/jobPost.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class inviteTalentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  message: string;

  @Column({ type: 'integer' })
  // @OneToOne(() => ProfileEntity, (profile) => profile.userId)
  userId: number;

  @Column({ type: 'varchar', length: 255 })
  // @OneToMany(() => JobPostEntity, (jobPost) => jobPost.jobTitle, { cascade: true })
  jobTitle: string;
}
