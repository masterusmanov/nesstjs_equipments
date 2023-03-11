import { BelongsTo, Column, ForeignKey, DataType, Model, Table } from "sequelize-typescript";
import { Equipment } from "src/equipment/models/equipment.model";
import { User } from "src/users/models/user.model";

interface OrderCreationAttrs{
    order_date: Date;
    amount: number;
    total_price: number;
};

@Table({tableName: 'order', createdAt: false, updatedAt: false})
export class Order extends Model<Order, OrderCreationAttrs>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => Equipment)
    @Column({type: DataType.INTEGER})
    equipmentId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @Column({
        type: DataType.DATE,
    })
    order_date: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    amount: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
    })
    total_price: number;

    @BelongsTo(() => Equipment)
    equipment: Equipment;

    @BelongsTo(() => User)
    user: User;
}
