import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { Order } from "src/order/models/order.model";

interface EquipmentCreationAttrs{
    name: string;
    price: number;
    image: string;
    description: string;
};

@Table({tableName: 'equipment'})
export class Equipment extends Model<Equipment, EquipmentCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
    })
    is_active: boolean;
}
