import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SendOfferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'integer' })
  price: number;

  @Column({ nullable: false, type: 'integer' })
  clientId: number;

  @Column({ nullable: false, type: 'integer' })
  @OneToOne(() => ProfileEntity, (profile) => profile.userId)
  freelancerId: ProfileEntity;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  jobTitle: string;
}
