import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { KitPart } from '../enums/kit-part.enum';
import { KitType } from '../enums/kit-type.enum';

@Entity('kit-elements')
export class KitElement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: KitPart })
  kit_part: KitPart;

  @Column({ type: 'enum', enum: KitType })
  kit_type: KitType;

  @Column()
  points_given: number;

  @Column()
  cost: number;

  @Column()
  image_url: string;
}
