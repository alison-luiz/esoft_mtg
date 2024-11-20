import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';

@Entity('rulings')
export class Ruling {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  date: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @ManyToOne(() => Card, card => card.rulings)
  card: Card;
}
