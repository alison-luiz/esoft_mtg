import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';

@Entity('legalities')
export class Legality {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  format: string;

  @Column({ nullable: true })
  legality: string;

  @ManyToOne(() => Card, card => card.legalities)
  card: Card;
}
