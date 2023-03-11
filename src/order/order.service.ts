import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrdertDto } from './dto/create-order.dto';
import { UpdateOrdertDto } from './dto/update-order.dto';
import { Order } from './models/order.model';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepo: typeof Order){}

  async createOrder(createOrderDto: CreateOrdertDto): Promise<Order>{
    const order = await this.orderRepo.create(this.createOrder);
    return order;
};

  async getAllOrders(): Promise<Order[]>{
    const orders = await this.orderRepo.findAll({include:{all: true}});
    return orders;
  };

  async getOneOrder(id: number): Promise<Order>{
    const order = await this.orderRepo.findOne({where: {id}});
    return order;
  };
  
  async updateOrder(id: number, updateOrderDto: UpdateOrdertDto){
    const order = await this.orderRepo.update(updateOrderDto, {
        where: {id},
        returning: true
    });
    return order;
  }
  
  async deleteOrder(id: number){
    return this.orderRepo.destroy({where: {id}});
  };

}
