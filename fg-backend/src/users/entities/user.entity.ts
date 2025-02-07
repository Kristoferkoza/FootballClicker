import { UserCard } from "src/usercard/entities/user-cards.entity";
import { UserKitElement } from "src/userkitelement/entities/user-kitelement.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ default: 0 })
    points: number;

    @OneToMany(() => UserCard, (userCard) => userCard.user, { cascade: true })
    userCards: UserCard[];

    @OneToMany(() => UserKitElement, (userKitElement) => userKitElement.user, { cascade: true })
    userKitElements: UserKitElement[];
}
