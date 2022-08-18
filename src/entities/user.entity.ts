import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, unique: true })
  googleId: string;

  @Column({
    type: 'enum',
    enum: ['Freelancer', 'Client', ' '],
    nullable: true,
  })
  role: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  phone: string;
}
