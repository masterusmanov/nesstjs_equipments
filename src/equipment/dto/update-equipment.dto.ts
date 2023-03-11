import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateEquipmentDto{
    @ApiProperty({ example: 'Equipment name', description: 'Uskuna nomi'})
    @IsNotEmpty()
    @IsString()
    readonly name?: string;

    @ApiProperty({ example: 'Price', description: 'Uskuna narxi'})
    @IsNotEmpty()
    @IsString()
    readonly price?: number;
    
    @ApiProperty({ example: 'Image', description: 'Uskuna rasmi'})
    @IsNotEmpty()
    @IsString()
    readonly image?: string;
    
    @ApiProperty({ example: 'About equipment', description: 'Uskuna haqida'})
    @IsNotEmpty()
    @IsString()
    readonly description?: string;
}