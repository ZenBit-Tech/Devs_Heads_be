import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: 0 })
  userId: number;

  @Column({ nullable: true })
  linkJob: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: false })
  text: string;

  @CreateDateColumn()
  created_at: Date;
}
