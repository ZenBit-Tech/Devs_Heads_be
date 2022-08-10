import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  googleId: string;
}
