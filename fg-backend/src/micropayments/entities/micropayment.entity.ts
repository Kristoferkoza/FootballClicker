import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('micropayments')
export class Micropayment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    reward: string;

    @Column()
    imageUrl: string;
}
