import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from '../roles/roles.entity';
import { UsersEntity } from '../users/users.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';


@Injectable()
export class UsersRolesService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        @InjectRepository(RolesEntity)
        private readonly rolesRepository: Repository<RolesEntity>
    ){}

    async addRoleToUser(userId: string, roles: RolesEntity[]): Promise<UsersEntity> {
        const user = await this.usersRepository.findOne({where: { id: userId },relations: ['roles'],
    });
        if(!user){
            throw new BusinessLogicException('El usuario no existe', BusinessError.USER_NOT_FOUND);
        }

        for(const role of roles){
            const roleEntity = await this.rolesRepository.findOne({where: { id: role.id }});
            if(!roleEntity){
                throw new BusinessLogicException('El rol no existe', BusinessError.INVALID_ROLES);
            }
            
        }
        user.roles = roles;
        return this.usersRepository.save(user);
    }

}
