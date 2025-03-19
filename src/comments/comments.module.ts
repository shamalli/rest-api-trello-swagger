import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UsersService } from '../users/users.service';
import { ColumnsService } from '../columns/columns.service';
import { CardsService } from '../cards/cards.service';

@Module({
	imports: [TypeOrmModule.forFeature([Comment])],
	controllers: [CommentsController],
	providers: [CommentsService, CardsService, ColumnsService, UsersService],
})
export class CommentsModule {}
