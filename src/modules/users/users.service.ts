import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AppError } from '../../shared/utils/appError.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findByEmail(createUserDto.email);
    if (userExists) {
      throw new AppError({
        id: 'ERROR_USER_EMAIL_ALREADY_EXISTS',
        message: 'User email already exists',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    try {
      const data = {
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10),
      };
      const createdUser = await this.userRepository.save(
        this.userRepository.create(data),
      );
      return createdUser;
    } catch (error) {
      throw new AppError({
        id: 'ERROR_CREATE_USER',
        message: 'Error creating user',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new AppError({
        id: 'ERROR_FIND_USER',
        message: 'Error finding user',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findOneBy({
        email,
      });
    } catch (error) {
      throw new AppError({
        id: 'ERROR_FIND_USER',
        message: 'Error finding user',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new AppError({
        id: 'ERROR_USER_NOT_FOUND',
        message: 'User not found',
        status: HttpStatus.NOT_FOUND,
      });
    }
    try {
      if (updateUserDto.password) {
        updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
      }
      const updateUser = this.userRepository.merge(user, updateUserDto);
      return await this.userRepository.save(updateUser);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_UPDATE_USER',
        message: 'Error updating user',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }
}
