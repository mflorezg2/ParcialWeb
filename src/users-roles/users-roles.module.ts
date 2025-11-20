import { Module } from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import { UsersRolesController } from './users-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';
import { RolesEntity } from '../roles/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, RolesEntity]),
  ],
  providers: [UsersRolesService],
  controllers: [UsersRolesController],
})
export class UsersRolesModule {}
