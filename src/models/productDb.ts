import { Model, Column, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";

@Table({ tableName: "products" })
export class ProductDb extends Model<ProductDb> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  })
  public id: number;

  @Column({ type: DataTypes.STRING })
  public name: string;

  @Column({ type: DataTypes.FLOAT })
  public kg: number;

  @Column({ type: DataTypes.FLOAT })
  public price: number;

  @Column({ type: DataTypes.INTEGER })
  public stock: number;

}