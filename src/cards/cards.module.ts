import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { UsersService } from '../users/users.service';
import { ColumnsService } from '../columns/columns.service';

@Module({
	imports: [TypeOrmModule.forFeature([Card])],
	controllers: [CardsController],
	providers: [CardsService, ColumnsService, UsersService],
})
export class CardsModule {}
