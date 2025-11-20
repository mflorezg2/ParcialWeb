/* eslint-disable prettier/prettier */
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UsersRolesService } from './users-roles.service';
import {Body,Controller,HttpCode,Param,Patch,UseGuards,UseInterceptors,} from '@nestjs/common';
import { RolesDto } from '../roles/roles.dto';
import { RolesEntity } from '../roles/roles.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsersRolesController {
  constructor(private readonly usersRolesService: UsersRolesService) {}

  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('admin')
  @Patch(':userId/roles')
  @HttpCode(200)
  async addRoleToUser(
    @Param('userId') userId: string,
    @Body() rolesdto: RolesDto[],
  ) {
    const roles = plainToInstance(RolesEntity, rolesdto);
    const user = await this.usersRolesService.addRoleToUser(userId, roles);
    return { message: 'Roles asignados', userId: user.id };
  }
}

