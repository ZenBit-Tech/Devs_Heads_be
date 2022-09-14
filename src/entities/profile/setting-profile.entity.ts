import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('setting')
export class SettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'integer' })
  user: number;

  @ManyToOne(() => ProfileEntity, (profile) => profile.setting, { cascade: true })
  userId: ProfileEntity;
}
