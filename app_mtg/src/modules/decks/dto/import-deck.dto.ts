import { IsUUID, ArrayNotEmpty, ArrayUnique, Length } from 'class-validator';

export class ImportDeckDto {
  @IsUUID()
  commanderId: string;

  @ArrayNotEmpty()
  @ArrayUnique()
  @Length(99, 99)
  @IsUUID(undefined, { each: true })
  cardIds: string[];
}
