import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TColumn } from '../../columns/entities/column.entity';

@Entity("cards")
export class Card {
	@PrimaryGeneratedColumn()
	@ApiProperty({ description: "Card ID", nullable: true })
	id: number;
	
	@ManyToOne(() => TColumn, (column) => column.id, { onDelete: "CASCADE" })
	@JoinColumn({ name: "column_id" })
	@ApiProperty({ description: "Column", nullable: true })
	column: TColumn;
}
