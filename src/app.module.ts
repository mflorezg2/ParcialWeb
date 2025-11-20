/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { UsersRolesModule } from './users-roles/users-roles.module';
import { AuthModule } from './auth/auth.module';

import { UsersEntity } from './users/users.entity';
import { RolesEntity } from './roles/roles.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcials',
      entities: [UsersEntity, RolesEntity],
      dropSchema: false,
      synchronize: true,
    }),

    AuthModule,
    UsersModule,
    RolesModule,
    UsersRolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

