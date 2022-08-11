import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('englishLevel')
export class EnglishLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}
