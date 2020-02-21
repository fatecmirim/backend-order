import { Column, Table } from "sequelize-typescript";
import { Model, DataTypes } from "sequelize/types";

@Table({ tableName: "items" })
export class OrderDb extends Model<OrderDb> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  })
  public id: number;

  @Column({ type: DataTypes.FLOAT })
  public total: string;

}