import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    example: '2020-09-25',
    description: 'Data da regra.',
  })
  @IsOptional()
  @IsString()
  date: string;

  @ApiProperty({
    example:
      'Activating Roiling Vortex’s last ability won’t undo any life gained before it resolved.',
    description: 'Texto da regra.',
  })
  @IsOptional()
  @IsString()
  text: string;
}

export class IdentifierDto {
  @ApiProperty({
    example: 'c8ba336d-ccc2-40a8-b1dd-e22dcc0f30e4',
    description: 'ID do Scryfall.',
  })
  @IsOptional()
  @IsString()
  scryfallId: string;

  @ApiProperty({
    example: 148449,
    description: 'ID do multiverse.',
  })
  @IsOptional()
  @IsNumber()
  multiverseId: number;
}

export class ForeignNameDto {
  @ApiProperty({
    example: 'Cho-Manno',
    description: 'Nome da carta em idioma estrangeiro.',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Verhindere allen Schaden, der Cho-Manno zugefügt würde.',
    description: 'Texto da carta no idioma estrangeiro.',
  })
  @IsOptional()
  @IsString()
  text: string;

  @ApiProperty({
    example: 'Legendäre Kreatur — Mensch, Rebell',
    description: 'Tipo da carta no idioma estrangeiro.',
  })
  @IsOptional()
  @IsString()
  type: string;

  @ApiPropertyOptional({
    example:
      '„Merkadias Masken können die Wahrheit nicht länger verbergen. Unsere Stunde ist endlich gekommen."',
    description: 'Texto de flavor da carta no idioma estrangeiro.',
  })
  @IsOptional()
  @IsString()
  flavor: string;

  @ApiProperty({
    example:
      'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=148449&type=card',
    description: 'URL da imagem da carta no idioma estrangeiro.',
  })
  @IsOptional()
  @IsString()
  imageUrl: string;

  @ApiProperty({
    example: 'German',
    description: 'Idioma da carta.',
  })
  @IsOptional()
  @IsString()
  language: string;

  @ApiPropertyOptional({
    type: IdentifierDto,
    description: 'Identificadores da carta no idioma estrangeiro.',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => IdentifierDto)
  identifiers: IdentifierDto;
}

export class LegalityDto {
  @ApiProperty({
    example: 'Commander',
    description: 'Formato em que a carta é legal.',
  })
  @IsOptional()
  @IsString()
  format: string;

  @ApiProperty({
    example: 'Legal',
    description: 'Status de legalidade da carta no formato.',
  })
  @IsOptional()
  @IsString()
  legality: string;
}

export class CreateCardDto {
  @ApiProperty({
    example: 'Cho-Manno, Revolutionary',
    description: 'Nome da carta.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: '{2}{W}{W}',
    description: 'Custo de mana da carta.',
  })
  @IsOptional()
  @IsString()
  manaCost: string;

  @ApiProperty({
    example: 4,
    description: 'Custo convertido de mana (cmc) da carta.',
  })
  @IsOptional()
  @IsNumber()
  cmc: number;

  @ApiProperty({
    example: ['W'],
    description: 'Cores da carta.',
  })
  @IsArray()
  @IsString({ each: true })
  colors: string[];

  @ApiProperty({
    example: ['W'],
    description: 'Identidade de cor da carta.',
  })
  @IsArray()
  @IsString({ each: true })
  colorIdentity: string[];

  @ApiProperty({
    example: 'Legendary Creature — Human Rebel',
    description: 'Tipo da carta.',
  })
  @IsOptional()
  @IsString()
  type: string;

  @ApiPropertyOptional({
    example: ['Legendary'],
    description: 'Supertipos da carta.',
  })
  @IsArray()
  @IsString({ each: true })
  supertypes: string[];

  @ApiProperty({
    example: ['Creature'],
    description: 'Tipos da carta.',
  })
  @IsArray()
  @IsString({ each: true })
  types: string[];

  @ApiPropertyOptional({
    example: ['Human', 'Rebel'],
    description: 'Subtipos da carta.',
  })
  @IsArray()
  @IsString({ each: true })
  subtypes: string[];

  @ApiProperty({
    example: 'Rare',
    description: 'Raridade da carta.',
  })
  @IsOptional()
  @IsString()
  rarity: string;

  @ApiProperty({
    example: '10E',
    description: 'Código do set da carta.',
  })
  @IsOptional()
  @IsString()
  set: string;

  @ApiProperty({
    example: 'Tenth Edition',
    description: 'Nome do set da carta.',
  })
  @IsOptional()
  @IsString()
  setName: string;

  @ApiProperty({
    example:
      'Prevent all damage that would be dealt to Cho-Manno, Revolutionary.',
    description: 'Texto da carta.',
  })
  @IsOptional()
  @IsString()
  text: string;

  @ApiPropertyOptional({
    example:
      '"Mercadia\'s masks can no longer hide the truth. Our day has come at last."',
    description: 'Texto de flavor da carta.',
  })
  @IsOptional()
  @IsString()
  flavor: string;

  @ApiProperty({
    example: 'Steven Belledin',
    description: 'Artista da carta.',
  })
  @IsOptional()
  @IsString()
  artist: string;

  @ApiProperty({
    example: '12',
    description: 'Número da carta no set.',
  })
  @IsOptional()
  @IsString()
  number: string;

  @ApiPropertyOptional({
    example: '2',
    description: 'Poder da carta.',
  })
  @IsOptional()
  @IsString()
  power: string;

  @ApiPropertyOptional({
    example: '2',
    description: 'Resistência da carta.',
  })
  @IsOptional()
  @IsString()
  toughness: string;

  @ApiProperty({
    example: 'normal',
    description: 'Layout da carta.',
  })
  @IsOptional()
  @IsString()
  layout: string;

  @ApiProperty({
    example: '130554',
    description: 'ID multiverse da carta.',
  })
  @IsOptional()
  @IsString()
  multiverseid: string;

  @ApiProperty({
    example:
      'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130554&type=card',
    description: 'URL da imagem da carta.',
  })
  @IsOptional()
  @IsString()
  imageUrl: string;

  @ApiPropertyOptional({
    example: '82ddb9b0-1fd3-5969-8eff-1b4b24db10d6',
    description: 'Variações da carta.',
  })
  @IsArray()
  @IsString({ each: true })
  variations: string[];

  @ApiPropertyOptional({
    type: [RulingDto],
    description: 'Regras da carta.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RulingDto)
  rulings: RulingDto[];

  @ApiPropertyOptional({
    type: [ForeignNameDto],
    description: 'Nomes estrangeiros da carta.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ForeignNameDto)
  foreignNames: ForeignNameDto[];

  @ApiProperty({
    example: ['10E', 'MMQ', 'PS11'],
    description: 'Sets nos quais a carta foi impressa.',
  })
  @IsArray()
  @IsString({ each: true })
  printings: string[];

  @ApiProperty({
    example:
      'Prevent all damage that would be dealt to Cho-Manno, Revolutionary.',
    description: 'Texto original da carta.',
  })
  @IsOptional()
  @IsString()
  originalText: string;

  @ApiProperty({
    example: 'Legendary Creature - Human Rebel',
    description: 'Tipo original da carta.',
  })
  @IsOptional()
  @IsString()
  originalType: string;

  @ApiPropertyOptional({
    type: [LegalityDto],
    description: 'Legalidades da carta nos diferentes formatos.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LegalityDto)
  legalities: LegalityDto[];

  @ApiProperty({
    example: '81daea6a-2735-5a46-a2da-b65a2ad5738f',
    description: 'ID único da carta.',
  })
  @IsOptional()
  @IsString()
  cardIdApi: string;

  @ApiProperty({
    example: 'API, User',
    description: 'ID do usuário que criou a carta.',
  })
  @IsOptional()
  @IsString()
  createdBy: string;
}
