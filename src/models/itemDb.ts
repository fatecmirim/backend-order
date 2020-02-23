import { Model, Column, Table, ForeignKey } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { ProductDb } from "./productDb";
import { OrderDb } from "./orderDb";

@Table({ tableName: "items" })
export class ItemDb extends Model<ItemDb> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  })
  public id: number;

  @ForeignKey(() => OrderDb)
  @Column({ type: DataTypes.INTEGER })
  public order_id;

  @ForeignKey(() => ProductDb)
  @Column({ type: DataTypes.INTEGER })
  public product_id;

  @Column({ type: DataTypes.INTEGER })
  public quantity;

  @Column({ type: DataTypes.FLOAT })
  public sub_total: number;

  

}