import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Alison',
    description: 'First name to update the user.',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Luiz',
    description: 'Last name to update the user.',
  })
  @IsOptional()
  @IsString()
  lastName?: string;
}
