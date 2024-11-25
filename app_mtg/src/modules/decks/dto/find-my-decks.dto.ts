import { QueryTemplateDto } from '@/shared/dtos/query-template.dto';
import { Deck } from '../entities/deck.entity';

export class FindMyDecksDto extends QueryTemplateDto {}

export interface PaginatedFindMeDecks {
  data: Deck[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}
