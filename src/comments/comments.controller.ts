import { Controller, Get, Post, Body, Req, Patch, Param, Delete, Query, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiSecurity, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Comments')
@Controller()
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post('users/:userId/columns/:columnId/cards/:cardId/comments')
	@ApiOperation({ summary: "Creates new comment" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiParam({ name: "cardId", required: true, description: "Card ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: Comment, isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	create(
		@Param('userId', ParseIntPipe) userId: number,
		@Req() req: any,
		@Param('columnId', ParseIntPipe) columnId: number,
		@Param('cardId', ParseIntPipe) cardId: number,
		@Body() createCardDto: CreateCommentDto
	) {
		return this.commentsService.create(userId, req.user.id, columnId, cardId, createCardDto);
	}

	@Get('users/:userId/columns/:columnId/cards/:cardId/comments')
	@ApiOperation({ summary: "Get all comments of a card" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiParam({ name: "cardId", required: true, description: "Card ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: Comment, isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	findAll(
		@Param('cardId', ParseIntPipe) cardId: number
	) {
		return this.commentsService.findAll(cardId);
	}

	@Get('users/:userId/columns/:columnId/cards/:cardId/comments/:commentId')
	@ApiOperation({ summary: "Get a comment by ID" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiParam({ name: "cardId", required: true, description: "Card ID" })
	@ApiParam({ name: "commentId", required: true, description: "Comment ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: Comment, isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	findOne(
		@Param('userId', ParseIntPipe) userId: number,
		@Param('columnId', ParseIntPipe) columnId: number,
		@Param('cardId', ParseIntPipe) cardId: number,
		@Param('commentId', ParseIntPipe) commentId: number
	) {
		return this.commentsService.findOne(commentId);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Patch('users/:userId/columns/:columnId/cards/:cardId/comments/:commentId')
	@ApiOperation({ summary: "Update a column by ID" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiParam({ name: "cardId", required: true, description: "Card ID" })
	@ApiParam({ name: "commentId", required: true, description: "Comment ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success", type: Comment , isArray: true })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	update(
		@Param('userId', ParseIntPipe) userId: number,
		@Req() req: any,
		@Param('columnId', ParseIntPipe) columnId: number,
		@Param('cardId', ParseIntPipe) cardId: number,
		@Param('commentId', ParseIntPipe) commentId: number,
		@Body() updateCardDto: UpdateCommentDto
	) {
		return this.commentsService.update(userId, req.user.id, columnId, cardId, commentId, updateCardDto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete('users/:userId/columns/:columnId/cards/:cardId/comments/:commentId')
	@ApiOperation({ summary: "Delete a card by ID" })
	@ApiParam({ name: "userId", required: true, description: "User ID" })
	@ApiParam({ name: "columnId", required: true, description: "Column ID" })
	@ApiParam({ name: "cardId", required: true, description: "Card ID" })
	@ApiParam({ name: "commentId", required: true, description: "Comment ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "Success"})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	remove(
		@Param('userId', ParseIntPipe) userId: number,
		@Req() req: any,
		@Param('columnId', ParseIntPipe) columnId: number,
		@Param('cardId', ParseIntPipe) cardId: number,
		@Param('commentId', ParseIntPipe) commentId: number
	) {
		return this.commentsService.remove(userId, req.user.id, columnId, cardId, commentId);
	}
}
