import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InviteTalentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  message: string;

  @Column({ nullable: false, type: 'integer' })
  clientId: number;

  @Column({ nullable: false, type: 'integer' })
  @OneToOne(() => ProfileEntity, (profile) => profile.userId)
  freelancerId: number;

  @Column({ nullable: false, type: 'integer' })
  @OneToOne(() => ProfileEntity, (profile) => profile.id)
  profileId: number;

  @Column({ nullable: false, type: 'integer' })
  jobPostId: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  jobTitle: string;
}
