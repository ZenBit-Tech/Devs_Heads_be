import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { JoinColumn } from 'typeorm';
import { SkillsEntity } from './skills.entity';
import { User } from './user.entity';
import { OfferEntity } from './offer.entity';
import { ClientSettingsEntity } from './clientSetttings.entity';

@Entity()
export class JobPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  jobTitle: string;

  @ManyToOne(() => CategoryEntity, (category) => category.id, { cascade: true })
  jobCategory: CategoryEntity;

  @ManyToMany(() => SkillsEntity, { cascade: true })
  @JoinTable()
  jobSkills: SkillsEntity[];

  @OneToOne(() => ClientSettingsEntity, (clientInfo) => clientInfo.userId)
  @JoinColumn()
  clientSetting: ClientSettingsEntity;

  @Column({ type: 'integer' })
  fromHourRate: number;

  @Column({ type: 'integer' })
  toHourRate: number;

  @OneToMany(() => OfferEntity, (offer) => offer.jobPostId)
  @JoinColumn()
  offer: OfferEntity;

  @Column({ type: 'varchar', length: 255 })
  jobDuration: string;

  @Column({ type: 'varchar', length: 5000 })
  jobDescription: string;

  @Column({ type: 'integer' })
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  userId: number;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  dateTime: Date;
}
