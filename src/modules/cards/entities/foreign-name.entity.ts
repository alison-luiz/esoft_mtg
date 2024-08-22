import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';

@Entity('foreign_names')
export class ForeignName {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  flavor: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  scryfallId: string;

  @Column({ nullable: true })
  multiverseId: number;

  @ManyToOne(() => Card, card => card.foreignNames)
  card: Card;
}
