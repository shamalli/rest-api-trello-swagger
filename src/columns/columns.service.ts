import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { EntityManager } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { TColumn } from './entities/column.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ColumnsService {
	constructor(
		@InjectEntityManager() private manager: EntityManager,
		private readonly usersService: UsersService
	) {}
	
	async create(userId: number, loggedUserId: number, createColumnDto: CreateColumnDto) {
		if (userId != loggedUserId) {
			throw new UnauthorizedException();
		}
	
		const user = await this.usersService.findOne(userId);
	
		if (user) {
			const column = new TColumn();
			column.user = user;

			return this.manager.save(column);
		}
	}

	async findAll(userId: number) {
		const user = await this.usersService.findOne(userId);
	
		if (user) {
			return this.manager.findBy(TColumn, { user: user });
		}
	}

	async findOne(columnId: number) {
		return this.manager.findOne(TColumn, {
			where: {id: columnId},
			relations: ['user']
		});
	}

	async update(userId: number, loggedUserId: number, columnId: number, updateColumnDto: UpdateColumnDto) {
	
		const column = await this.findOne(columnId);
	
		if (column) {
			if (column.user.id != loggedUserId) {
				throw new UnauthorizedException();
			}
			
			const user = await this.usersService.findOne(updateColumnDto.user_id);
		
			if (user) {
				column.user = user;
				
				await this.manager.update(TColumn, columnId, column);
				
				return this.findOne(columnId);
			}
		}
	}

	async remove(userId: number, loggedUserId: number, columnId: number) {
		const column = await this.findOne(columnId);
	
		if (column) {
			if (column.user.id != loggedUserId) {
				throw new UnauthorizedException();
			}
		
			const user = await this.usersService.findOne(userId);
		
			if (user) {
				await this.manager.delete(TColumn, columnId);
			}
		}
	}
}
