import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { PassThrough } from 'stream';
import { AppError } from '../../../shared/utils/appError.exception';
import { Config } from '../entities/config.entity';
import { ForeignNameDto, LegalityDto, RulingDto } from '../dto/create-card.dto';
import { CreateCardService } from './create-card.service';

@Injectable()
export class GetCardsApi {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
    private readonly createCardService: CreateCardService,
  ) {}

  async execute(): Promise<string> {
    const hasFetchCards = await this.configRepository.findOne({
      where: {
        hasFetchCards: true,
      },
    });
    if (hasFetchCards) {
      throw new AppError({
        id: 'CARDS_ALREADY_FETCHED',
        message: 'Cards already fetched',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    const url = `${process.env.MAGIC_THE_GATHERING_API_URL}/cards`;
    const lastPage = Number(process.env.LAST_PAGE_NUMBER);
    for (let page = 1; page <= lastPage; page++) {
      const responseStream = axios({
        method: 'get',
        url: `${url}?page=${page}`,
        responseType: 'stream',
      });
      const transformStream = new PassThrough({
        objectMode: true,
      });
      let accumulatedData = '';
      transformStream.on('data', async chunk => {
        accumulatedData += chunk.toString();
        try {
          const { cards: apiCards } = JSON.parse(accumulatedData);
          if (!Array.isArray(apiCards)) {
            throw new AppError({
              id: 'INVALID_API_RESPONSE',
              message: 'API response is not in the expected format',
              status: HttpStatus.BAD_REQUEST,
            });
          }
          const chunkData = apiCards.map(card => {
            return {
              name: card.name,
              manaCost: card.manaCost,
              cmc: card.cmc,
              colors: card.colors,
              colorIdentity: card.colorIdentity,
              type: card.type,
              supertypes: card.supertypes,
              types: card.types,
              subtypes: card.subtypes,
              rarity: card.rarity,
              set: card.set,
              setName: card.setName,
              text: card.text,
              flavor: card.flavor,
              artist: card.artist,
              number: card.number,
              power: card.power,
              toughness: card.toughness,
              layout: card.layout,
              multiverseid: card.multiverseid,
              imageUrl: card.imageUrl,
              variations: card.variations,
              rulings: card.rulings?.map(({ date, text }: RulingDto) => ({
                date,
                text,
              })),
              foreignNames: card.foreignNames?.map(
                ({
                  name,
                  text,
                  type,
                  flavor,
                  imageUrl,
                  language,
                  identifiers,
                }: ForeignNameDto) => ({
                  name,
                  text,
                  type,
                  flavor,
                  imageUrl,
                  language,
                  identifiers: {
                    scryfallId: identifiers?.scryfallId,
                    multiverseId: identifiers?.multiverseId,
                  },
                }),
              ),
              printings: card.printings,
              originalText: card.originalText,
              originalType: card.originalType,
              legalities: card.legalities?.map(
                ({ format, legality }: LegalityDto) => ({
                  format,
                  legality,
                }),
              ),
              cardIdApi: card.id,
              createdBy: 'API',
            };
          });
          await this.createCardService.executeBatch(chunkData);
          accumulatedData = '';
        } catch (err) {
          if (!(err instanceof SyntaxError)) {
            throw new AppError({
              id: 'PARSE_API_RESPONSE_ERROR',
              message: 'Error to parse API response',
              status: HttpStatus.BAD_REQUEST,
            });
          }
        }
      });
      await (await responseStream).data.pipe(transformStream);
    }
    await this.configRepository.save({
      hasFetchCards: true,
    });

    return 'Cards fetched successfully';
  }
}
