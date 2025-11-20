/* eslint-disable prettier/prettier */
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RolesService } from './roles.service';
import {Body,Controller,Get,HttpCode,Post,UseGuards,UseInterceptors,} from '@nestjs/common';
import { RolesDto } from './roles.dto';
import { RolesEntity } from './roles.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles as RolesDeco } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('roles')
@UseInterceptors(BusinessErrorsInterceptor)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@RolesDeco('admin')
  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.rolesService.findAll();
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@RolesDeco('admin')
  @Post()
  @HttpCode(201)
  async create(@Body() roledto: RolesDto) {
    const roleEntity: RolesEntity = plainToInstance(RolesEntity, roledto);
    return await this.rolesService.createRole(roleEntity);
  }
}

