import { Card } from "src/cards/entities/card.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column } from "typeorm";

@Entity('user-cards')
export class UserCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userCards, { eager: false, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Card, (card) => card.userCards, { eager: false, onDelete: 'CASCADE' })
  card: Card;

  @CreateDateColumn({ type: 'timestamp' })
  firstFoundDate: Date;

  @Column({ default: 1 })
  quantity: number;
}
