import express from "express";
import routes from "./routes";
import * as dotenv from "dotenv";
import config from "./environment/config";
import ConnectionFactory from "./models/database";
import bodyParser from "body-parser";

export default class App {

  constructor(
    private readonly app = express(),
  ) {
    dotenv.config();
    this.middlewares();
    this.connectDatabase();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(bodyParser.json());
  }

  private async connectDatabase(): Promise<void> {
    const connection: ConnectionFactory = new ConnectionFactory(config);
    connection.connect();
    await connection.test();
  }

  private routes(): void {
    this.app.use(routes);
  }

  public async start(): Promise<void> {
    this.app.listen(3000, () => {
      console.log(`The server is running on port ${3000}`);
      return Promise.resolve();
    });
  }

}