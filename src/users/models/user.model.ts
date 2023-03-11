import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";


interface UserCreationAttrs{
    name: string;
    email: string;
    password: string;
    phone_number: string;
    location: string;
};

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone_number: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_admin: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
    })
    is_active: boolean;
}
