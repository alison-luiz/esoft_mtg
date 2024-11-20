import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeckDto {
  @ApiProperty({
    example: 'b069383a-f69b-48ee-83bc-e68713eae910',
    description: 'Commander ID to create the deck.',
  })
  @IsNotEmpty()
  @IsString()
  commanderId: string;

  @ApiProperty({
    example: 'My new deck',
    description: 'Name of the deck.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
