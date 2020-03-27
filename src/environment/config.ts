import * as dotenv from "dotenv";
dotenv.config();
const config = {
  database: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    port: process.env.DATABASE_PORT
  },
  secretKeyToken: process.env.SECRET_KEY_TOKEN || "",
  backend: {
    host: process.env.BACKEND_HOST,
    port: process.env.BACKEND_PORT
  }
}

export default config;