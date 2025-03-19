import { ApiProperty } from "@nestjs/swagger";
import { TColumn } from '../../columns/entities/column.entity';

export class CreateCardDto {
	@ApiProperty({ description: "Column" })
	column: TColumn;
}
