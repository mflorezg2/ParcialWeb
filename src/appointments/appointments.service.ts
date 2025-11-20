import { Injectable } from '@nestjs/common';
import { AppointmentsEntity } from './appointments.entity';
import { Repository } from 'typeorm';
import { Status } from './enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(AppointmentsEntity)
        private readonly appointmentsRepository: Repository<AppointmentsEntity>
    ){}

    createAppointment(appointment:AppointmentsEntity): Promise<AppointmentsEntity>{
        return this.appointmentsRepository.save(appointment);
    }

    findAll(): Promise<AppointmentsEntity[]> {
        return this.appointmentsRepository.find();
    }

    deleteAppointment(id:string): Promise<void>{
        return this.appointmentsRepository.delete(id).then(() => {});
    }

    UpdateAppointmentStatus(id:string, status:string): Promise<AppointmentsEntity>{
        return this.appointmentsRepository.findOne({where:{id:id}}).then(appointment => {
            appointment.status = Status[status as keyof typeof Status];
            return this.appointmentsRepository.save(appointment);
        });
    }
}
