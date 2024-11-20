import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({
    example: 'alison.luiz@gmail.com',
    description: 'Email to login in the application',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Pass@123',
    description: 'Password to login in the application',
  })
  @IsString()
  password: string;
}
