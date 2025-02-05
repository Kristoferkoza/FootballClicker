import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('packs')
export class Pack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cost: number;

  @Column('float')
  common_probability: number;

  @Column('float')
  rare_probability: number;

  @Column('float')
  epic_probability: number;

  @Column('float')
  legendary_probability: number;

  @Column()
  number_of_cards: number;

  @Column()
  image_url: string;
}
