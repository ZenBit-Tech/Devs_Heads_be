import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SignUpSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
