import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { TColumn } from './columns/entities/column.entity';
import { Card } from './cards/entities/card.entity';
import { Comment } from './comments/entities/comment.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
  	TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'rest_api_trello_swagger',
      entities: [User, TColumn, Card, Comment],
      //autoLoadEntities: true,
      synchronize: true,
    }),
  	UsersModule,
  	ColumnsModule,
  	CardsModule,
  	CommentsModule,
  	AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
	
}
