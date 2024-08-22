import { QueryTemplateDto } from '../../../shared/dtos/query-template.dto';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Card } from '@/modules/cards/entities/card.entity';

export class FindAllCommanderQueryDto extends QueryTemplateDto {
  @ApiPropertyOptional({
    example: 'Cho-Manno, Revolutionary',
    description: 'Commander name.',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'W',
    description: 'Commander color identity.',
  })
  @IsString()
  @IsOptional()
  colorIdentity?: string;
}

export interface PaginatedResultFindAllCommanderDto {
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
