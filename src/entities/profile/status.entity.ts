import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('saveProfileFreelancer')
export class SaveProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  saved: boolean;

  @Column({ type: 'integer', default: 0, unique: false })
  clientId: number;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id)
  @Column({ type: 'integer', unique: false })
  freelancerId: number;
}
