import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Equipment } from './models/equipment.model';
import { User } from 'src/users/models/user.model';
import { Order } from 'src/order/models/order.model';


@Module({
  imports: [SequelizeModule.forFeature([Equipment, User, Order])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService]
})
export class EquipmentModule {}
