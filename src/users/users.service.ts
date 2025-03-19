import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	
	constructor(@InjectEntityManager() private manager: EntityManager) {}

	create(createUserDto: CreateUserDto) {
		const user = new User();
		user.email = createUserDto.email;
		user.password = createUserDto.password;
		
		return this.manager.save(user);
	}

	findOne(userId: number) {
		return this.manager.findOneBy(User, { id: userId });
	}
	
	findOneByEmail(email: string) {
		return this.manager.findOneBy(User, { email: email });
	}

	async update(userId: number, updateUserDto: UpdateUserDto) {
		const user = new User();
		user.email = updateUserDto.email;
		user.password = updateUserDto.password;
		
		await this.manager.update(User, userId, user);
		
		return this.findOne(userId);
	}

	async remove(userId: number) {
		await this.manager.delete(User, userId);
	}
}
