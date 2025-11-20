/* eslint-disable prettier/prettier */

import { UsersEntity } from 'src/users/users.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RolesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true})
    role_name: string;

    @Column({nullable: true})
    description?: string;

    @ManyToMany(() => UsersEntity, user => user.roles)
    users:UsersEntity[];
}
