import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { EntityManager } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { TColumn } from '../columns/entities/column.entity';
import { Card } from './entities/card.entity';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class CardsService {
	constructor(
		@InjectEntityManager() private manager: EntityManager,
		private readonly columnsService: ColumnsService
	) {}
	
	async create(userId: number, loggedUserId: number, columnId: number, createCardDto: CreateCardDto) {
		if (userId != loggedUserId) {
			throw new UnauthorizedException();
		}
	
		const column = await this.columnsService.findOne(columnId);
	
		if (column) {
			const card = new Card();
			card.column = column;

			return this.manager.save(card);
		}
	}

	async findAll(columnId: number) {
		const column = await this.columnsService.findOne(columnId);
	
		if (column) {
			return this.manager.findBy(Card, { column: column });
		}
	}

	async findOne(cardId: number) {
		return this.manager.findOne(Card, {
			where: {id: cardId},
			relations: ['column', 'column.user']
		});
	}

	async update(userId: number, loggedUserId: number, columnId: number, cardId: number, updateCardDto: UpdateCardDto) {
		const card = await this.findOne(cardId);
	
		if (card) {
			if (card.column.user.id != loggedUserId) {
				throw new UnauthorizedException();
			}
			
			const column = await this.columnsService.findOne(updateCardDto.column_id);
		
			if (column) {
				card.column = column;
				
				await this.manager.update(Card, cardId, card);
				
				return this.findOne(cardId);
			}
		}
	}

	async remove(userId: number, loggedUserId: number, columnId: number, cardId: number) {
		const card = await this.findOne(cardId);
	
		if (card) {
			if (card.column.user.id != loggedUserId) {
				throw new UnauthorizedException();
			}
		
			const column = await this.columnsService.findOne(columnId);
		
			if (column) {
				await this.manager.delete(Card, cardId);
			}
		}
	}
}
