import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ForeignName } from './foreign-name.entity';
import { Legality } from './legality.entity';
import { Ruling } from './ruling.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  manaCost: string;

  @Column({ nullable: true })
  cmc: number;

  @Column({ type: 'simple-array', nullable: true })
  colors: string[];

  @Column({ type: 'simple-array', nullable: true })
  colorIdentity: string[];

  @Column({ nullable: true })
  type: string;

  @Column({ type: 'simple-array', nullable: true })
  supertypes: string[];

  @Column({ type: 'simple-array', nullable: true })
  types: string[];

  @Column({ type: 'simple-array', nullable: true })
  subtypes: string[];

  @Column({ nullable: true })
  rarity: string;

  @Column({ nullable: true })
  set: string;

  @Column({ nullable: true })
  setName: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ nullable: true })
  flavor: string;

  @Column({ nullable: true })
  artist: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  power: string;

  @Column({ nullable: true })
  toughness: string;

  @Column({ nullable: true })
  layout: string;

  @Column({ nullable: true })
  multiverseid: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'simple-array', nullable: true })
  variations: string[];

  @OneToMany(() => Ruling, ruling => ruling.card, { cascade: true })
  rulings: Ruling[];

  @OneToMany(() => ForeignName, foreignName => foreignName.card, {
    cascade: true,
  })
  foreignNames: ForeignName[];

  @OneToMany(() => Legality, legality => legality.card, { cascade: true })
  legalities: Legality[];

  @Column({ type: 'simple-array', nullable: true })
  printings: string[];

  @Column({ type: 'text', nullable: true })
  originalText: string;

  @Column({ nullable: true })
  originalType: string;

  @Column({ nullable: true })
  cardIdApi: string;

  @Column({ nullable: true })
  createdBy: string;
}
