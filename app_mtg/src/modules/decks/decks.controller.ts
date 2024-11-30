import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppError } from '@/shared/utils/appError.exception';
import { CreateDeckDto } from './dto/create-deck.dto';
import { CreateDeckService } from './services/create-deck.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { DeleteOneDeckService } from './services/delete-one-deck.service';
import { diskStorage } from 'multer';
import { ExportDeckDto } from './dto/export-deck.dto';
import { Express } from 'express-serve-static-core';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindAllDecksDto } from './dto/find-all-decks.dto';
import { FindAllDecksService } from './services/find-all-decks.service';
import { FindMyDecksDto } from './dto/find-my-decks.dto';
import { FindMyDecksService } from './services/find-my-decks.service';
import { FindOneDeckService } from './services/find-one-deck.service';
import { Request, Response } from 'express';
import { Role } from '../users/enums/role.enum';
import { Roles } from '../users/decorators/roles.decorator';
import { UserFromJwt } from '../auth/models/user-from-jwt';
import * as fs from 'fs';
import { MessagePattern, Payload } from '@nestjs/microservices';

@ApiTags('Decks')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('decks')
@ApiBearerAuth()
export class DecksController {
  constructor(
    private readonly createDeckService: CreateDeckService,
    private readonly deleteOneDeckService: DeleteOneDeckService,
    private readonly findMyDecksService: FindMyDecksService,
    private readonly findOneDeckService: FindOneDeckService,
    private readonly findAllDecksService: FindAllDecksService,
  ) {}

  @MessagePattern('deck_updates_queue')
  async handleMessage(@Payload() receivedResponse: any) {
    console.log('Deck saved in the DataBase from RabbitMQ');
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll(@Query() findAllDecksDto: FindAllDecksDto) {
    return this.findAllDecksService.execute(findAllDecksDto);
  }

  @Get('myDecks')
  @Roles(Role.USER)
  async findMyDecks(
    @CurrentUser() user: UserFromJwt,
    @Query() findMyDecksDto: FindMyDecksDto,
  ) {
    return this.findMyDecksService.execute(user.id, findMyDecksDto);
  }

  @Get(':id')
  @Roles(Role.USER)
  async findOne(@CurrentUser() user: UserFromJwt, @Param('id') id: string) {
    return this.findOneDeckService.execute(user.id, id);
  }

  @Post('export')
  @Roles(Role.USER)
  async exportDeck(@Body() exportDeckDto: ExportDeckDto) {
    return this.createDeckService.exportDeck(exportDeckDto);
  }

  @Post()
  @Roles(Role.USER)
  async create(
    @CurrentUser() user: UserFromJwt,
    @Body() createDeckDto: CreateDeckDto,
  ) {
    return this.createDeckService.execute(user.id, createDeckDto);
  }

  @Post('import')
  @Roles(Role.USER)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          callback(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(json)$/)) {
          return callback(
            new HttpException(
              'Only JSON files are allowed!',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async importDeckFile(
    @CurrentUser() user: UserFromJwt,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new AppError({
        id: 'FILE_NOT_FOUND',
        message: 'File not found',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    const userId = user.id;
    try {
      const fileContent = fs.readFileSync(file.path, 'utf8');
      const deckData = JSON.parse(fileContent);
      if (
        !deckData.commanderId ||
        !Array.isArray(deckData.cardIds) ||
        deckData.cardIds.length !== 99
      ) {
        throw new AppError({
          id: 'INVALID_FILE_FORMAT',
          message:
            'Invalid file format. Make sure the JSON contains a commanderId and 99 cardIds.',
          status: HttpStatus.BAD_REQUEST,
        });
      }
      const createdDeck = await this.createDeckService.importDeck(
        deckData,
        userId,
      );
      fs.unlinkSync(file.path);
      return createdDeck;
    } catch (error) {
      fs.unlinkSync(file.path);
      throw new AppError({
        id: 'ERROR_IMPORTING_DECK',
        message: 'Error importing deck',
        status: HttpStatus.BAD_REQUEST,
        error,
      });
    }
  }

  @Delete(':id')
  @Roles(Role.USER)
  async deleteOne(@CurrentUser() user: UserFromJwt, @Param('id') id: string) {
    return this.deleteOneDeckService.execute(user.id, id);
  }
}
