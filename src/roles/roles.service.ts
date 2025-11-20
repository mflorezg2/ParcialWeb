import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RolesEntity)
        private readonly rolesRepository: Repository<RolesEntity>
    ){}

    async createRole(role:RolesEntity): Promise<RolesEntity>{
        const roleWithSameName = await this.rolesRepository.findOne({where:{role_name:role.role_name}});
        if(roleWithSameName){
            throw new BusinessLogicException('El rol ya existe', BusinessError.ROLE_ALREADY_EXISTS);
        }
        if(!role.role_name || role.role_name.trim() === ''){
            throw new BusinessLogicException('El nombre del rol es requerido', BusinessError.ROLE_NAME_REQUIRED);
        }
        return this.rolesRepository.save(role);
    }

    async findAll(): Promise<RolesEntity[]> {
        try {
            return await this.rolesRepository.find();
        } catch (e) {
            throw new BusinessLogicException('Error listando roles',BusinessError.ERROR_FETCHING_ROLES,);
        }
    }
}