import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn, ManyToOne, Column } from 'typeorm';
import { JobPostEntity } from './jobPost.entity';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class ChatRoom {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: JobPostEntity })
  @ManyToOne(() => JobPostEntity)
  @JoinColumn({ name: 'jobPostId' })
  jobPostId: JobPostEntity;

  @ApiProperty({ type: User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'senderId' })
  senderId: User;

  @ApiProperty({ type: User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiverId' })
  receiverId: User;

  @ApiProperty({ type: [Message] })
  @OneToMany(() => Message, (message) => message.chatRoom)
  message: Message[];

  @ApiProperty({ example: false, description: 'Status of active room or not' })
  @Column({ default: false })
  activeRoom: boolean;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'When created' })
  @CreateDateColumn()
  createdAt: Date;
}
