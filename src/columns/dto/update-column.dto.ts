import { PartialType } from '@nestjs/mapped-types';
import { CreateColumnDto } from './create-column.dto';
import { ApiProperty } from "@nestjs/swagger";
import { User } from '../../users/entities/user.entity';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {
	@ApiProperty({ description: "User ID", nullable: true })
	user_id: number;
}
