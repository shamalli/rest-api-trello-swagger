import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { EntityManager } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { TColumn } from '../columns/entities/column.entity';
import { Card } from '../cards/entities/card.entity';
import { Comment } from './entities/comment.entity';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class CommentsService {
	constructor(
		@InjectEntityManager() private manager: EntityManager,
		private readonly cardsService: CardsService
	) {}
	
	async create(userId: number, loggedUserId: number, columnId: number, cardId: number, createCommentDto: CreateCommentDto) {
		if (userId != loggedUserId) {
			throw new UnauthorizedException();
		}
	
		const card = await this.cardsService.findOne(cardId);
	
		if (card) {
			const comment = new Comment();
			comment.card = card;

			return this.manager.save(comment);
		}
	}

	async findAll(cardId: number) {
		const card = await this.cardsService.findOne(cardId);
	
		if (card) {
			return this.manager.findBy(Comment, { card: card });
		}
	}

	async findOne(commentId: number) {
		return this.manager.findOne(Comment, {
			where: {id: commentId},
			relations: {
				card: {
					column: {
						user: true
					}
				}
			}
		});
	}

	async update(userId: number, loggedUserId: number, columnId: number, cardId: number, commentId: number, updateCommentDto: UpdateCommentDto) {
		const comment = await this.findOne(commentId);
	
		if (comment) {
			if (comment.card.column.user.id != loggedUserId) {
				throw new UnauthorizedException();
			}
			
			const card = await this.cardsService.findOne(updateCommentDto.card_id);
		
			if (card) {
				comment.card = card;
				
				await this.manager.update(Comment, commentId, comment);
				
				return this.findOne(commentId);
			}
		}
	}

	async remove(userId: number, loggedUserId: number, columnId: number, cardId: number, commentId: number) {
		const comment = await this.findOne(commentId);
	
		if (comment) {
			if (comment.card.column.user.id != loggedUserId) {
				throw new UnauthorizedException();
			}
			
			const card = await this.cardsService.findOne(cardId);
		
			if (card) {
				await this.manager.delete(Comment, commentId);
			}
		}
	}
}
