import { Controller, Body, Request, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiSecurity, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
	 constructor(private authService: AuthService) {}

	@Post('auth/login')
	@ApiOperation({ summary: "Login user" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: User, isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	async login(@Body() loginUserDto: LoginUserDto) {
		return this.authService.login(loginUserDto); // get the token
	}
}