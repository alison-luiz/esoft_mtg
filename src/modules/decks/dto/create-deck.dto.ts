import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDeckDto {
  @ApiProperty({
    example: 'b069383a-f69b-48ee-83bc-e68713eae910',
    description: 'Commander ID to create the deck.',
  })
  @IsString()
  commanderId: string;

  @ApiProperty({
    example: 'My new deck',
    description: 'Name of the deck.',
  })
  @IsString()
  name: string;
}
