import { Module } from '@nestjs/common';
import { AppointmentsEntity } from './appointments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointments.service';

@Module({
  providers: [AppointmentsService]
})
export class AppointmentsModule {
    
}
