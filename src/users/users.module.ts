import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
