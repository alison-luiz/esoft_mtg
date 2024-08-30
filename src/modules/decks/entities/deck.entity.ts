import { Card } from '@/modules/cards/entities/card.entity';
import { User } from '@/modules/users/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('decks')
export class Deck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  commanderId: string;

  @Column({ type: 'simple-array', nullable: true })
  colors: string[];

  @ManyToMany(() => Card, { eager: true })
  @JoinTable()
  cards: Card[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  updateTimestamps() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  createdBy: User;
}
