import { Model, Column, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import config from "../environment/config";

@Table({ tableName: "photos" })
export class PhotoDb extends Model<PhotoDb> {
  
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  })
  public id: number;

  @Column({type: DataTypes.STRING})
  public path;

  @Column(DataTypes.VIRTUAL(DataTypes.STRING))
  get url(): string {
    return `http://${config.backend.host}:${config.backend.port}/api/public/${this.path}`;
  }

 
}

