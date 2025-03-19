import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
 	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({ summary: "Creates new user" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: User, isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get(':userId')
	@ApiOperation({ summary: "Get a user by ID" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: User, isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	findOne(@Param('userId', ParseIntPipe) userId: number) {
		return this.usersService.findOne(userId);
	}

	@Patch(':userId')
	@ApiOperation({ summary: "Update a user by ID" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: User , isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	update(@Param('userId', ParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(userId, updateUserDto);
	}

	@Delete(':userId')
	@ApiOperation({ summary: "Delete a user by ID" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success"})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	remove(@Param('userId', ParseIntPipe) userId: number) {
		return this.usersService.remove(userId);
	}
}
