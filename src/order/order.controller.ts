import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrdertDto } from './dto/create-order.dto';
import { UpdateOrdertDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Buyurtmalar')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({summary: "Buyurtma berish"})
  @Post()
  create(@Body() createOrderDto: CreateOrdertDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({summary: "Buyurtma ma'lumotlarini olish"})
  @Get()
  findAll() {
    return this.orderService.getAllOrders();
  }

  @ApiOperation({summary: "Bitta buyurtma ma'lumotlarini olish"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.getOneOrder(+id);
  }

  @ApiOperation({summary: "Bitta buyurtma ma'lumotlarini yangilash"})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrdertDto) {
    return this.orderService.updateOrder(+id, updateOrderDto);
  }

  @ApiOperation({summary: "Bitta buyurtma ma'lumotlarini o'chirish"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.deleteOrder(+id);
  }
}
