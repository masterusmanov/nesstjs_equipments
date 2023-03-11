import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ActivateUserDto } from './dto/active_user.dto';
import { AdminUserDto } from './dto/admin_user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';

@ApiTags('Foydalanuvchilar')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: "Foydalanuvchi yarattish"})
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @ApiOperation({summary: "Foydalanuvchilarni ko'rish"})
    @UseGuards(JwtAuthGuard)
    @Get('all')
    async getAllSalesman(){
        return this.usersService.getAllUsers();
    };

    @ApiOperation({summary: "Foydalanuvchilarni ID bo'yicha olish"})
    @UseGuards(UserSelfGuard)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOneUser(@Param('id') id: string): Promise<User>{
        return this.usersService.getOneUser(+id);
    };

    @ApiOperation({summary: "Foydalanuvchilarni ID bo'yicha o'chirish"})
    @UseGuards(UserSelfGuard)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(+id);
    };

    @ApiOperation({summary: "Foydalanuvchilarni ID bo'yicha yangilash"})
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
        return this.usersService.updateUser(+id, updateUserDto);
    };

    @ApiOperation({summary: "Foydalanuvchilarni ID bo'yicha aktivlashtirish"})
    @Post('activate')
    activateUser(@Body() activateUserDto: ActivateUserDto){
    return this.usersService.activateUser(activateUserDto)
    };

    @ApiOperation({summary: "Foydalanuvchilarni ID bo'yicha aktivlikni bekor qilish"})
    @Post('deactivate')
    deactivateUser(@Body() activateUserDto: ActivateUserDto){
        return this.usersService.deactivateUser(activateUserDto)
    };

    @ApiOperation({summary: "Foydalanuvchiga ADMIN rolini berish"})
    @Post('admin')
    adminUser(@Body() adminUserDto: AdminUserDto){
    return this.usersService.adminUser(adminUserDto)
    };

    @ApiOperation({summary: "Foydalanuvchiga ADMIN rolini bekor qilish"})
    @Post('noadmin')
    noadminUser(@Body() noadminUserDto: AdminUserDto){
        return this.usersService.noadminUser(noadminUserDto)
    };
  
  
}
