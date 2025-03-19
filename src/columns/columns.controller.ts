import { Controller, Get, Post, Body, Req, Patch, Param, Delete, Query, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { TColumn } from './entities/column.entity';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiSecurity, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Columns')
@Controller()
export class ColumnsController {
	constructor(private readonly columnsService: ColumnsService) {}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post('users/:userId/columns')
	@ApiOperation({ summary: "Creates new column" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: TColumn, isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	create(
		@Param('userId', ParseIntPipe) userId: number,
		@Req() req: any,
		@Body() createColumnDto: CreateColumnDto
	) {
		return this.columnsService.create(userId, req.user.id, createColumnDto);
	}

	@Get('users/:userId/columns')
	@ApiOperation({ summary: "Get all columns of a user" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: TColumn, isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	findAll(
		@Param('userId', ParseIntPipe) userId: number
	) {
		return this.columnsService.findAll(userId);
	}

	@Get('users/:userId/columns/:columnId')
	@ApiOperation({ summary: "Get a column by ID" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: TColumn, isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	findOne(
		//@Param('userId', ParseIntPipe) userId: number,
		@Param('columnId', ParseIntPipe) columnId: number
	) {
		return this.columnsService.findOne(columnId);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Patch('users/:userId/columns/:columnId')
	@ApiOperation({ summary: "Update a column by ID" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: TColumn , isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	update(
		@Param('userId', ParseIntPipe) userId: number,
		@Req() req: any,
		@Param('columnId', ParseIntPipe) columnId: number,
		@Body() updateColumnDto: UpdateColumnDto
	) {
		return this.columnsService.update(userId, req.user.id, columnId, updateColumnDto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete('users/:userId/columns/:columnId')
	@ApiOperation({ summary: "Delete a column by ID" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success"})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	remove(
		@Param('userId', ParseIntPipe) userId: number,
		@Req() req: any,
		@Param('columnId', ParseIntPipe) columnId: number
	) {
		return this.columnsService.remove(userId, req.user.id, columnId);
	}
}
