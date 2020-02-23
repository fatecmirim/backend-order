import { Sequelize } from "sequelize-typescript";
import {CustomerDb, OrderDb, ProductDb, ItemDb} from "./index";


export default class ConnectionFactory {

  private connection;
  private config;
  constructor(config) {
    this.config = config;
  }

  public connect(): Sequelize {
    this.connection = new Sequelize(this.config.database.name, "postgres", this.config.database.password, {
      host: this.config.database.host,
      dialect: "postgres",
      models: [CustomerDb, OrderDb, ProductDb, ItemDb]
    });
    return this.connection;
  }

  public async test(): Promise<Sequelize> {
    try {
      await this.connection.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    return this.connection;
  }

  public buildModels(sequelize: Sequelize): void {
    sequelize.addModels([
      CustomerDb, OrderDb, ProductDb, ItemDb
    ]);
  }
}