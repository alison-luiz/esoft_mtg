import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindCardsCreateDeckDto {
  @ApiProperty({
    example: 'W',
    description: 'Card color identity.',
  })
  @IsString()
  colorIdentity: string;
}
