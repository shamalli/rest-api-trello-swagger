import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TColumn } from './entities/column.entity';
import { UsersService } from '../users/users.service';

@Module({
	imports: [TypeOrmModule.forFeature([TColumn])],
	controllers: [ColumnsController],
	providers: [ColumnsService, UsersService],
})
export class ColumnsModule {}
