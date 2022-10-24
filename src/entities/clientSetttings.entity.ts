import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { OfferEntity } from './offer.entity';
import { User } from './user.entity';

@Entity()
export class ClientSettingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OfferEntity, (offer) => offer.clientId)
  @JoinColumn()
  offer: OfferEntity;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  quantity: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'longtext' })
  photo: string;

  @Column({ type: 'integer' })
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.id)
  userId: number;
}
