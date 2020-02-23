import { Model, Table, Column, Unique, BelongsToMany, HasMany, Index } from "sequelize-typescript";
import { DataTypes } from "sequelize";

@Table({ tableName: "customers" })
export class CustomerDb extends Model<CustomerDb> {

  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  })
  public id: number;

  @Column({ type: DataTypes.STRING })
  public name: string;

  @Column({ type: DataTypes.STRING })
  public email: string;

  @Column({ type: DataTypes.STRING })
  public password: string;

  @Column({ type: DataTypes.STRING })
  public phone: string;

}