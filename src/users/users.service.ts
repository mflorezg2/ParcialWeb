/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find({ relations: ['roles'] });
  }

  async findOne(id: string): Promise<UsersEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!user) {
      throw new BusinessLogicException('Usuario no encontrado', BusinessError.USER_NOT_FOUND);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UsersEntity | null> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async createUser(user: UsersEntity): Promise<UsersEntity> {
    const userWithSameEmail = await this.usersRepository.findOne({
      where: { email: user.email },
    });
    if (userWithSameEmail) {
      throw new BusinessLogicException(
        'Email ya registrado',
        BusinessError.EMAIL_ALREADY_EXISTS,
      );
    }

    return this.usersRepository.save(user);
  }
}

