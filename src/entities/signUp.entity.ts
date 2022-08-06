import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SignUp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
