import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrdertDto {
    @ApiProperty({ example: 'Order date', description: 'Buyurtma sanasi'})
    @IsNotEmpty()
    @IsString()
    readonly order_date: Date;

    @ApiProperty({ example: 'Amount', description: 'Uskuna miqdori'})
    @IsNotEmpty()
    @IsString()
    readonly amount: string;

    @ApiProperty({ example: 'Order total price', description: 'Buyurtmaning umumiy summasi'})
    @IsNotEmpty()
    @IsString()
    readonly total_price: number;
}
