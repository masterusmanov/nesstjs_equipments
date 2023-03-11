import {SetMetadata} from '@nestjs/common'

export const ORDERS_KEY = 'orders';
export const Orders = (...orders: string[]) => SetMetadata(ORDERS_KEY, orders)