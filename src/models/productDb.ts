import { Model, Column, Table, ForeignKey, HasOne } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { PhotoDb } from "./photoDb";
import Photo from "../entity/photo";

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

  @ForeignKey(() => PhotoDb)
  @Column({type: DataTypes.INTEGER, field: "photo_id"})
  public photoId;

}