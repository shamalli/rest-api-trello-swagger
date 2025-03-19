import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findOneByEmail(email);
		if (user && user.password === pass) {
			return user;
		}
		return null;
	}
	
	async login(dto: LoginUserDto) {
		const user = await this.validateUser(dto.email, dto.password);
		
		if (user) {
			const payload = { email: user.email, user_id: user.id};
			return {
				Bearer: this.jwtService.sign(payload),
			};
		} else {
			throw new UnauthorizedException();
		}
	}
}
