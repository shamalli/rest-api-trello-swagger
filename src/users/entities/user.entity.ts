import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	@ApiProperty({ description: "User ID", nullable: true })
	id: number;
	
	@Column()
	@ApiProperty({ description: "User email", nullable: true })
	email: string;
	
	@Column()
	@ApiProperty({ description: "User pass", nullable: true })
	password: string;
}
