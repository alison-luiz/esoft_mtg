import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Alison',
    description: 'First name to register the user.',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Luiz',
    description: 'Last name to register the user.',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'alison.luiz@gmail.com',
    description: 'Email to register the user.',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'Pass@123',
    description:
      'Password to register the user. It must have at least 4 characters and at most 20 characters.',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
