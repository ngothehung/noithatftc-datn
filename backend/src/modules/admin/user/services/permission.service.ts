import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Permission } from 'src/entities/permission.entity';
import { PermissionDto } from '../dtos/permission.dto';
import { Paging } from 'src/helpers/helper';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>
    ) {
    }
    async getListsPermissions(filter: any)
    {
        const condition: any = {};
        if (filter.group) condition.group = filter.group;
        if (filter.id) condition.id = filter.id;
        if (filter.name) condition.name = Like('%' + filter.name +'%');

        const [rs, total] = await this.permissionRepository.findAndCount({
            where: condition,
            take: filter.page_size,
            skip: (filter.page - 1) * filter.page_size
        });
		return {
			permissions: rs,
			meta: new Paging(filter.page, filter.page_size, total)
		};
    }

    async create(permissionData: PermissionDto)
    {
        const newData = await this.permissionRepository.create(permissionData);
        return await this.permissionRepository.save(newData);
    }

    async show(id: number)
    {
        return await this.permissionRepository.findOne({
            where: {
                id
            },
            relations: ['roles']
        });
    }

    async update(id: number, permissionData: any)
    {
         await this.permissionRepository.createQueryBuilder()
            .update(Permission)
            .set({...permissionData, updated_at: new Date()})
            .where("id = :id", { id: id })
            .execute();

         return await this.show(id);
    }
}
