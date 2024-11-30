import { IsUUID, Length, IsString } from 'class-validator';

export class ExportDeckDto {
  @IsUUID()
  commanderId: string;

  @IsString()
  @Length(1, 255)
  name: string;
}
