import { Model, Column, Table, ForeignKey } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { CustomerDb } from "./customerDb";

@Table({ tableName: "orders" })
export class OrderDb extends Model<OrderDb> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  })
  public id: number;

  @ForeignKey(() => CustomerDb)
  @Column({type: DataTypes.INTEGER})
  public customer_id;

  @Column({type: DataTypes.BOOLEAN})
  public accepted: boolean;
}