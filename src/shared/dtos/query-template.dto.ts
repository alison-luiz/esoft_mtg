import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QueryTemplateDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página para consulta.',
    default: 1
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Quantidade de registros por página.',
    default: 10
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit: number;
}
