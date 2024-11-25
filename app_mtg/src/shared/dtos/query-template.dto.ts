import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QueryTemplateDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Number of the page to be returned.',
    default: 1,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Quantity of items to be returned per page.',
    default: 10,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit: number;
}
