import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './models/equipment.model';
import { ActivateEquipmentDto } from './dto/active_equipment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Uskunalar')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

    @ApiOperation({summary: "Uskunani qo'shish"})
    @Post('create')
    async createEquipment(@Body() createEquipmentDto: CreateEquipmentDto): Promise<Equipment>{
        return this.equipmentService.createEqupment(createEquipmentDto)
    };

    @ApiOperation({summary: "Uskunalar ma'lumotlarini ko'rish"})
    @Get('all')
    async getAllEquipment(){
        return this.equipmentService.getAllEquipmant();
    };

    @ApiOperation({summary: "Bitta uskuna haqida ko'rish"})
    @Get(':id')
    async getOneEquipment(@Param('id') id: string): Promise<Equipment>{
        return this.equipmentService.getOneEquipment(+id);
    };

    @ApiOperation({summary: "Bitta uskuna ma'lumotini o'chirish"})
    @Delete(':id')
    async deleteEquipment(@Param('id') id: string){
        return this.equipmentService.deleteEquipment(+id);
    };

    @ApiOperation({summary: "Bitta uskuna ma'lumotini yangilash"})
    @Put(':id')
    async updateEquipment(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto){
        return this.equipmentService.updateEquipment(+id, updateEquipmentDto);
    };

    @ApiOperation({summary: "Bitta uskuna ma'lumotlarini aktivlashtirish"})
    @Post('activate')
    activateEquipment(@Body() activateEquipmentDto: ActivateEquipmentDto){
        return this.equipmentService.activateEquipment(activateEquipmentDto)
    };

    @ApiOperation({summary: "Bitta uskuna ma'lumotlarini aktivlikni bekor qilish"})
    @Post('deactivate')
    deactivateUser(@Body() activateUserDto: ActivateEquipmentDto){
        return this.equipmentService.deactivateEquipment(activateUserDto)
    }
}
