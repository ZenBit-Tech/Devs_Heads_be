import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn, ManyToOne, Column } from 'typeorm';
import { JobPostEntity } from './jobPost.entity';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobPostEntity)
  @JoinColumn({ name: 'jobPostId' })
  jobPostId: JobPostEntity;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'senderId' })
  senderId: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiverId' })
  receiverId: User;

  @OneToMany(() => Message, (message) => message.chatRoom)
  message: Message[];

  @Column({ default: false })
  activeRoom: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
