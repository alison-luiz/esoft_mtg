import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AppError } from '../../shared/utils/appError.exception';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { ChangeRoleAdminDto } from './dto/change-role-admin.dto';
import { env } from 'process';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async changeRoleAdmin(changeRoleAdminDto: ChangeRoleAdminDto) {
    if (changeRoleAdminDto.secretAdminKey !== env.SECRET_ADMIN_KEY) {
      throw new AppError({
        id: 'ERROR_INVALID_SECRET_KEY',
        message: 'Invalid secret key',
        status: HttpStatus.UNAUTHORIZED,
      });
    }
    const user = await this.findByEmail(changeRoleAdminDto.email);
    if (!user) {
      throw new AppError({
        id: 'ERROR_USER_NOT_FOUND',
        message: 'User not found',
        status: HttpStatus.NOT_FOUND,
      });
    }
    const updateUser = this.userRepository.merge(user, {
      roles: [Role.ADMIN],
    });
    await this.userRepository.save(updateUser);
    return {
      message: 'User role updated successfully.',
    };
  }

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

  async updatePassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    if (
      updateUserPasswordDto.oldPassword === updateUserPasswordDto.newPassword
    ) {
      throw new AppError({
        id: 'ERROR_PASSWORD_SAME',
        message: 'The new password cannot be the same as the old password',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    const user = await this.findOne(id);
    if (!user) {
      throw new AppError({
        id: 'ERROR_USER_NOT_FOUND',
        message: 'User not found',
        status: HttpStatus.NOT_FOUND,
      });
    }
    if (!bcrypt.compareSync(updateUserPasswordDto.oldPassword, user.password)) {
      throw new AppError({
        id: 'ERROR_PASSWORD_DOES_NOT_MATCH',
        message: 'Password does not match',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    try {
      const updateUser = this.userRepository.merge(user, {
        password: bcrypt.hashSync(updateUserPasswordDto.newPassword, 10),
      });
      await this.userRepository.save(updateUser);
      return {
        message: 'Password updated successfully',
      };
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
