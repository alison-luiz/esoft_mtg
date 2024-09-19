import { QueryTemplateDto } from '../../../shared/dtos/query-template.dto';
import { IsOptional, IsString } from 'class-validator';
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
