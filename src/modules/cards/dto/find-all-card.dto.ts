import { QueryTemplateDto } from '../../../shared/dtos/query-template.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Card } from '@/modules/cards/entities/card.entity';

export class FindAllCardQueryDto extends QueryTemplateDto {
  @ApiPropertyOptional({
    example: 'Cho-Manno, Revolutionary',
    description: 'Card name.',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'W',
    description: 'Card color identity.',
  })
  @IsString()
  @IsOptional()
  colorIdentity?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Find cards to create a deck.',
  })
  @IsOptional()
  @IsBoolean()
  createDeck?: boolean;
}

export interface PaginatedResultFindAllCardDto {
  data: Card[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}
