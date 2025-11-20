/* eslint-disable prettier/prettier */

import { UsersEntity } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ForeignKey } from 'typeorm';
import { Status } from './enum';

@Entity()
export class AppointmentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable:false})
  id_user: string;

  @Column({nullable:false})
  id_user_medico: string;

  @Column({type:'timestamp'})
  datetime:Date;

  @Column()
  status: Status;

  @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created_at:Date;

  @ManyToOne(() => UsersEntity, (user) => user.appointments) 
  user: UsersEntity;

  @ManyToOne(() => UsersEntity, (user) => user.appointments) 
  user_medico: UsersEntity;

}