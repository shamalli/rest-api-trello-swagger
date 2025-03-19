import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCardDto extends PartialType(CreateCardDto) {
	@ApiProperty({ description: "Column ID", nullable: true })
	column_id: number;
}
