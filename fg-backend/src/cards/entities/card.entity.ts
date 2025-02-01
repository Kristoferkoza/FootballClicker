import { Max, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CardType } from "../enums/card-type.enum";
import { UserCard } from "src/usercard/entities/user-cards.entity";

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Min(1)
  @Max(99)
  overall: number;

  @Column()
  position: string;

  @Column()
  nationality: string;

  @Column()
  club: string;

  @Column({ type: 'enum', enum: CardType })
  cardType: CardType;

  @Column({ default: 'defaultImageURL' })
  imageUrl: string;

  @OneToMany(() => UserCard, (userCard) => userCard.card, { cascade: true })
  userCards: UserCard[];

  @Column()
  @Min(1)
  @Max(99)
  tem: number;

  @Column()
  @Min(1)
  @Max(99)
  str: number;


  @Column()
  @Min(1)
  @Max(99)
  pod: number;


  @Column()
  @Min(1)
  @Max(99)
  dry: number;


  @Column()
  @Min(1)
  @Max(99)
  def: number;


  @Column()
  @Min(1)
  @Max(99)
  fiz: number;


}
