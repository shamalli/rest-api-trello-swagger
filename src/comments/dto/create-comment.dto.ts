import { ApiProperty } from "@nestjs/swagger";
import { Card } from '../../cards/entities/card.entity';

export class CreateCommentDto {
	@ApiProperty({ description: "Card" })
	column: Card;
}