import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty({
    example: 'Pass@123',
    description: 'Old password to update the user.',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  oldPassword: string;

  @ApiProperty({
    example: 'Pass@321',
    description:
      'New password to update the user. It must have at least 4 characters and at most 20 characters.',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  newPassword: string;
}
