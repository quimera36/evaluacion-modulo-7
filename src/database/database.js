import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("dbevaluacion", "postgres", "tenshijin", {
  host: "localhost",
  dialect: "postgres",
});