import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SignInSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
