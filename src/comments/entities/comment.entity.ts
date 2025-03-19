import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Card } from '../../cards/entities/card.entity';

@Entity("comments")
export class Comment {
	@PrimaryGeneratedColumn()
	@ApiProperty({ description: "Comment ID", nullable: true })
	id: number;
	
	@ManyToOne(() => Card, (card) => card.id, { onDelete: "CASCADE" })
	@JoinColumn({ name: "card_id" })
	@ApiProperty({ description: "Card", nullable: true })
	card: Card;
}
