import { Controller, Get, Post, Body, Req, Patch, Param, Delete, Query, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiSecurity, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Cards')
@Controller()
export class CardsController {
	constructor(private readonly cardsService: CardsService) {}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post('users/:userId/columns/:columnId/cards')
	@ApiOperation({ summary: "Creates new card" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: Card, isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	create(
		@Param('userId', ParseIntPipe) userId: number,
		@Req() req: any,
		@Param('columnId', ParseIntPipe) columnId: number,
		@Body() createCardDto: CreateCardDto
	) {
		return this.cardsService.create(userId, req.user.id, columnId, createCardDto);
	}

	@Get('users/:userId/columns/:columnId/cards')
	@ApiOperation({ summary: "Get all cards of a column" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: Card, isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	findAll(
		//@Param('userId', ParseIntPipe) userId: number,
		@Param('columnId', ParseIntPipe) columnId: number
	) {
		return this.cardsService.findAll(columnId);
	}

	@Get('users/:userId/columns/:columnId/cards/:cardId')
	@ApiOperation({ summary: "Get a card by ID" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiParam({ name: "cardId", required: true, description: "Card ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: Card, isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	findOne(
		@Param('userId', ParseIntPipe) userId: number,
		@Param('columnId', ParseIntPipe) columnId: number,
		@Param('cardId', ParseIntPipe) cardId: number
	) {
		return this.cardsService.findOne(cardId);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Patch('users/:userId/columns/:columnId/cards/:cardId')
	@ApiOperation({ summary: "Update a column by ID" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiParam({ name: "cardId", required: true, description: "Card ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: Card , isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	update(
		@Param('userId', ParseIntPipe) userId: number,
		@Req() req: any,
		@Param('columnId', ParseIntPipe) columnId: number,
		@Param('cardId', ParseIntPipe) cardId: number,
		@Body() updateCardDto: UpdateCardDto
	) {
		return this.cardsService.update(userId, req.user.id, columnId, cardId, updateCardDto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete('users/:userId/columns/:columnId/cards/:cardId')
	@ApiOperation({ summary: "Delete a card by ID" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiParam({ name: "cardId", required: true, description: "Card ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success"})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	remove(
		@Param('userId', ParseIntPipe) userId: number,
		@Req() req: any,
		@Param('columnId', ParseIntPipe) columnId: number,
		@Param('cardId', ParseIntPipe) cardId: number,
	) {
		return this.cardsService.remove(userId, req.user.id, columnId, cardId);
	}
}
