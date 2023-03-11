import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Equipment } from './models/equipment.model';
import { ActivateEquipmentDto } from './dto/active_equipment.dto';


@Injectable()
export class EquipmentService {
  constructor(@InjectModel(Equipment) private equipmentRepository: typeof Equipment){};

  async createEqupment(createEquipmentDto: CreateEquipmentDto): Promise<Equipment>{
    const equipment = await this.equipmentRepository.create(createEquipmentDto);
    return equipment;
  };

  async activateEquipment(equipmentUserDto: ActivateEquipmentDto){
    const equipment = await this.equipmentRepository.findByPk(equipmentUserDto.userId);
    if(!equipment){
      throw new HttpException('Uskuna topilmadi', HttpStatus.NOT_FOUND)
    }
    equipment.is_active = true;
    await equipment.save();
    return equipment;
  };

  async deactivateEquipment(equipmentUserDto: ActivateEquipmentDto){
    const equipment = await this.equipmentRepository.findByPk(equipmentUserDto.userId);
    if(!equipment){
      throw new HttpException('Uskuna topilmadi', HttpStatus.NOT_FOUND)
    }
    equipment.is_active = false;
    await equipment.save();
    return equipment;
  };

  async getAllEquipmant(): Promise<Equipment[]>{
    const equipments = await this.equipmentRepository.findAll({include:{all: true}});
    return equipments;
  };

  async getOneEquipment(id: number): Promise<Equipment>{
    const equipment = await this.equipmentRepository.findOne({where: {id}});
    return equipment;
  };

  async deleteEquipment(id: number){
    return this.equipmentRepository.destroy({where: {id}});
  };

  async updateEquipment(id: number, updateEquipmentDto: UpdateEquipmentDto){
    const salesman = await this.equipmentRepository.update(updateEquipmentDto, {
        where: {id},
        returning: true
    });
    return salesman;
  };

}
