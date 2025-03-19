import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity("columns")
export class TColumn {
	@PrimaryGeneratedColumn()
	@ApiProperty({ description: "Column ID", nullable: true })
	id: number;
	
	@ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	@ApiProperty({ description: "User", nullable: true })
	user: User;
}
