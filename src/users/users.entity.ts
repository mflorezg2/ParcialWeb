/* eslint-disable prettier/prettier */

import { RolesEntity } from 'src/roles/roles.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique:true})
  email: string;

  @Column({})
  password: string;

  @Column()
  name:string;

  @Column({nullable:true})
  phone?:string;

  @Column({default:true})
  is_active:boolean;

  @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created_at:Date;

  @ManyToMany(()=>RolesEntity, role => role.users)
  @JoinTable()
  roles:RolesEntity[];

}
