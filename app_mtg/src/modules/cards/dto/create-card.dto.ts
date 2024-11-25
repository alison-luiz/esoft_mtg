import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RulingDto {
  @ApiPropertyOptional({
    example: '2020-09-25',
    description: 'Date of the ruling.',
  })
  @IsOptional()
  @IsString()
  date: string;

  @ApiPropertyOptional({
    example:
      'Activating Roiling Vortex’s last ability won’t undo any life gained before it resolved.',
    description: 'Text of the ruling.',
  })
  @IsOptional()
  @IsString()
  text: string;
}

export class IdentifierDto {
  @ApiPropertyOptional({
    example: 'c8ba336d-ccc2-40a8-b1dd-e22dcc0f30e4',
    description: 'ID Scryfall.',
  })
  @IsOptional()
  @IsString()
  scryfallId: string;

  @ApiPropertyOptional({
    example: 148449,
    description: 'ID Multiverse.',
  })
  @IsOptional()
  @IsNumber()
  multiverseId: number;
}

export class ForeignNameDto {
  @ApiPropertyOptional({
    example: 'Cho-Manno',
    description: 'Name of the card in the foreign language.',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Verhindere allen Schaden, der Cho-Manno zugefügt würde.',
    description: 'Text of the card in the foreign language.',
  })
  @IsOptional()
  @IsString()
  text: string;

  @ApiPropertyOptional({
    example: 'Legendäre Kreatur — Mensch, Rebell',
    description: 'Type of the card in the foreign language.',
  })
  @IsOptional()
  @IsString()
  type: string;

  @ApiPropertyOptional({
    example:
      '„Merkadias Masken können die Wahrheit nicht länger verbergen. Unsere Stunde ist endlich gekommen."',
    description: 'Text of the flavor in the foreign language.',
  })
  @IsOptional()
  @IsString()
  flavor: string;

  @ApiPropertyOptional({
    example:
      'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=148449&type=card',
    description: 'URL of the image in the foreign language.',
  })
  @IsOptional()
  @IsString()
  imageUrl: string;

  @ApiPropertyOptional({
    example: 'German',
    description: 'Language of the card.',
  })
  @IsOptional()
  @IsString()
  language: string;

  @ApiPropertyOptional({
    type: IdentifierDto,
    description: 'Identifiers of the card in the foreign language.',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => IdentifierDto)
  identifiers: IdentifierDto;
}

export class LegalityDto {
  @ApiPropertyOptional({
    example: 'Commander',
    description: 'Format of the legality.',
  })
  @IsOptional()
  @IsString()
  format: string;

  @ApiPropertyOptional({
    example: 'Legal',
    description: 'Status of the legality.',
  })
  @IsOptional()
  @IsString()
  legality: string;
}

export class CreateCardDto {
  @ApiPropertyOptional({
    example: 'Cho-Manno, Revolutionary',
    description: 'Name of the card.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: '{2}{W}{W}',
    description: 'Mana cost of the card.',
  })
  @IsOptional()
  @IsString()
  manaCost: string;

  @ApiPropertyOptional({
    example: 4,
    description: 'Converted mana cost of the card.',
  })
  @IsOptional()
  @IsNumber()
  cmc: number;

  @ApiPropertyOptional({
    example: ['W'],
    description: 'Colors of the card.',
  })
  @IsArray()
  @IsString({ each: true })
  colors: string[];

  @ApiPropertyOptional({
    example: ['W'],
    description: 'Color identity of the card.',
  })
  @IsArray()
  @IsString({ each: true })
  colorIdentity: string[];

  @ApiPropertyOptional({
    example: 'Legendary Creature — Human Rebel',
    description: 'Card type.',
  })
  @IsOptional()
  @IsString()
  type: string;

  @ApiPropertyOptional({
    example: ['Legendary'],
    description: 'Supertypes of the card.',
  })
  @IsArray()
  @IsString({ each: true })
  supertypes: string[];

  @ApiPropertyOptional({
    example: ['Creature'],
    description: 'Types of the card.',
  })
  @IsArray()
  @IsString({ each: true })
  types: string[];

  @ApiPropertyOptional({
    example: ['Human', 'Rebel'],
    description: 'Subtypes of the card.',
  })
  @IsArray()
  @IsString({ each: true })
  subtypes: string[];

  @ApiPropertyOptional({
    example: 'Rare',
    description: 'Rarity of the card.',
  })
  @IsOptional()
  @IsString()
  rarity: string;

  @ApiPropertyOptional({
    example: '10E',
    description: 'Code of the set of the card.',
  })
  @IsOptional()
  @IsString()
  set: string;

  @ApiPropertyOptional({
    example: 'Tenth Edition',
    description: 'Name of the set of the card.',
  })
  @IsOptional()
  @IsString()
  setName: string;

  @ApiPropertyOptional({
    example:
      'Prevent all damage that would be dealt to Cho-Manno, Revolutionary.',
    description: 'Text of the card.',
  })
  @IsOptional()
  @IsString()
  text: string;

  @ApiPropertyOptional({
    example:
      '"Mercadia\'s masks can no longer hide the truth. Our day has come at last."',
    description: 'Text of the flavor.',
  })
  @IsOptional()
  @IsString()
  flavor: string;

  @ApiPropertyOptional({
    example: 'Steven Belledin',
    description: 'Artist of the card.',
  })
  @IsOptional()
  @IsString()
  artist: string;

  @ApiPropertyOptional({
    example: '12',
    description: 'Number of the card.',
  })
  @IsOptional()
  @IsString()
  number: string;

  @ApiPropertyOptional({
    example: '2',
    description: 'Power of the card.',
  })
  @IsOptional()
  @IsString()
  power: string;

  @ApiPropertyOptional({
    example: '2',
    description: 'Resistance of the card.',
  })
  @IsOptional()
  @IsString()
  toughness: string;

  @ApiPropertyOptional({
    example: 'normal',
    description: 'Layout of the card.',
  })
  @IsOptional()
  @IsString()
  layout: string;

  @ApiPropertyOptional({
    example: '130554',
    description: 'ID Multiverse.',
  })
  @IsOptional()
  @IsString()
  multiverseid: string;

  @ApiPropertyOptional({
    example:
      'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130554&type=card',
    description: 'URL of the image.',
  })
  @IsOptional()
  @IsString()
  imageUrl: string;

  @ApiPropertyOptional({
    example: '82ddb9b0-1fd3-5969-8eff-1b4b24db10d6',
    description: 'Variations of the card.',
  })
  @IsArray()
  @IsString({ each: true })
  variations: string[];

  @ApiPropertyOptional({
    type: [RulingDto],
    description: 'Rulings of the card.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RulingDto)
  rulings: RulingDto[];

  @ApiPropertyOptional({
    type: [ForeignNameDto],
    description: 'Names of the card in different languages.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ForeignNameDto)
  foreignNames: ForeignNameDto[];

  @ApiPropertyOptional({
    example: ['10E', 'MMQ', 'PS11'],
    description: 'Sets of the card where it was printed.',
  })
  @IsArray()
  @IsString({ each: true })
  printings: string[];

  @ApiPropertyOptional({
    example:
      'Prevent all damage that would be dealt to Cho-Manno, Revolutionary.',
    description: 'Text of the card in the original language.',
  })
  @IsOptional()
  @IsString()
  originalText: string;

  @ApiPropertyOptional({
    example: 'Legendary Creature - Human Rebel',
    description: 'Type of the card in the original language.',
  })
  @IsOptional()
  @IsString()
  originalType: string;

  @ApiPropertyOptional({
    type: [LegalityDto],
    description: 'Legalities of the card in different formats.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LegalityDto)
  legalities: LegalityDto[];

  @ApiPropertyOptional({
    example: '81daea6a-2735-5a46-a2da-b65a2ad5738f',
    description: 'Unique ID of the card.',
  })
  @IsOptional()
  @IsString()
  cardIdApi: string;
}
