import express from "express";
import routes from "./routes";
import * as dotenv from "dotenv";
import config from "./environment/config";
import ConnectionFactory from "./models/database";

export default class App {

  constructor(
    private readonly app = express(),
  ) {
    dotenv.config();
    this.connectDatabase();
    this.routes();
    this.middlewares();
  }

  private middlewares(): void {
    console.log("without middleware");
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