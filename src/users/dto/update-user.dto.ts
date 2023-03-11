import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, MinLength } from "class-validator";

export class UpdateUserDto{
    @ApiProperty({ example: 'UserName', description: 'Foydalanuvchi ismi'})
    @IsNotEmpty()
    @IsString()
    readonly name?: string;

    @ApiProperty({ example: 'User@email.uz', description: 'Foydalanuvchi emaili'})
    @IsEmail()
    readonly email?: string;

    @ApiProperty({ example: 'P@$$w00rd', description: 'Foydalanuvchi paroli'})
    @IsStrongPassword()
    readonly password?: string;

    @ApiProperty({ example: 'Username phone number', description: 'Foydalanuvchi telefon raqami'})
    @IsNotEmpty()
    @IsString()
    readonly phone_number?: string;
    
    @ApiProperty({ example: 'User location', description: 'Foydalanuvchi lokatsiyasi'})
    @IsString()
    readonly location?: string;
}