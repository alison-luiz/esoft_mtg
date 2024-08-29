import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeRoleAdminDto {
  @ApiProperty({
    description: 'The email of the user to change the role to admin.',
    example: 'alison.luiz@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The secret key to change the role of a user to admin.',
    example: '9c7fd8ed-2ee5-43be-be34-67863a30ab9c',
  })
  @IsNotEmpty()
  @IsString()
  secretAdminKey: string;
}
