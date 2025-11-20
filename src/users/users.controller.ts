/* eslint-disable prettier/prettier */
import {Controller,Get,HttpCode,Req,UseGuards,UseInterceptors,} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('admin')
  @Get()
  @HttpCode(200)
  async findAll(): Promise<UsersEntity[]> {
    const users = await this.usersService.findAll();
    return users.map((u) => {const { password, ...rest } = u as any;
      return rest;
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(200)
  async getProfile(@Req() req) {
    const user = await this.usersService.findOne(req.user.userId);
    const { password, ...rest } = user as any;
    return rest;
  }
}

