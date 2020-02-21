import { Column, Table } from "sequelize-typescript";
import { Model, DataTypes } from "sequelize/types";

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
  public price: string;

  @Column({ type: DataTypes.INTEGER })
  public stock: string;

}