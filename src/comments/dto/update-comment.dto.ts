import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
	@ApiProperty({ description: "Card ID", nullable: true })
	card_id: number;
}
