
import { KitElement } from "src/kitelements/entities/kitelement.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column } from "typeorm";

@Entity('user-kitelements')
export class UserKitElement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userKitElements, { eager: false, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => KitElement, (kitElement) => kitElement.userKitElements, { eager: false, onDelete: 'CASCADE' })
  kitElement: KitElement;

  @CreateDateColumn({ type: 'timestamp' })
  firstFoundDate: Date;

  @Column({ default: 1 })
  quantity: number;
}
