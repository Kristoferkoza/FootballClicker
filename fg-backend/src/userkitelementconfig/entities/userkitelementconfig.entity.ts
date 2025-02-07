import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user-kitelementconfig')
export class UserKitElementConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid', nullable: true })
  tshirtId: string | null;

  @Column({ type: 'uuid', nullable: true })
  shortId: string | null;

  @Column({ type: 'uuid', nullable: true })
  sockId: string | null;

  @Column({ type: 'uuid', nullable: true })
  bootId: string | null;

  @Column({ type: 'int', default: 0 })
  bonuses: number;
}
