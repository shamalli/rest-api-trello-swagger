import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
	@IsEmail()
	@ApiProperty({ description: "User email", nullable: true })
	email: string;

	@IsString()
	@MaxLength(25)
	@MinLength(5)
	@ApiProperty({ description: "User pass", nullable: true })
	password: string;
}
