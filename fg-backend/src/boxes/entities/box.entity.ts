import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('boxes')
export class Box {
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
  image_url: string;
}
