import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { KitPart } from '../enums/kit-part.enum';
import { KitType } from '../enums/kit-type.enum';
import { UserKitElement } from 'src/userkitelement/entities/user-kitelement.entity';

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

  @Column({ default: true })
  can_be_dropped: boolean;

  @Column()
  image_url: string;

  @OneToMany(() => UserKitElement, (userKitElement) => userKitElement.kitElement, { cascade: true })
  userKitElements: UserKitElement[];
}
