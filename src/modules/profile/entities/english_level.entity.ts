import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('englishLevel')
export class EnglishLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
