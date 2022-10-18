import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ClientSettingsEntity {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Adam', description: 'Client name' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'Poland', description: 'Client country' })
  @Column({ type: 'varchar', length: 255 })
  country: string;

  @ApiProperty({ example: 'sample of website', description: 'Client website' })
  @Column({ nullable: true })
  website: string;

  @ApiProperty({ example: 'IT', description: 'Client industry' })
  @Column({ nullable: true })
  industry: string;

  @ApiProperty({ example: '12', description: 'Client quantity ' })
  @Column({ nullable: true })
  quantity: string;

  @ApiProperty({ example: 'awesome', description: 'Client description' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 1, description: 'userId' })
  @Column({ type: 'integer' })
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.userId, { cascade: true })
  userId: number;
}
