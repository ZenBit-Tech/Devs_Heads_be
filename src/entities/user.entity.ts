import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { ForgotPassword } from './forgot-password.entity';
import { ProfileEntity } from './profile/profile.entity';
import { JobPostEntity } from './jobPost.entity';

@Entity({ name: 'user', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  googleId: string;

  @OneToMany(() => ForgotPassword, (forgotPassword: ForgotPassword) => forgotPassword.user)
  forgotPassword: ForgotPassword[];

  @OneToMany(() => JobPostEntity, (jobPost: JobPostEntity) => jobPost.userId)
  jobPost: JobPostEntity;

  @OneToOne(() => ProfileEntity, (profile) => profile.id)
  profile: ProfileEntity;
}
