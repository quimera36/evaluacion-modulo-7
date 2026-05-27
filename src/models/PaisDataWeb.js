import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const PaisDataWeb = sequelize.define(
  "paises_data_web",
  {
    nombre_pais: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    accion: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default PaisDataWeb;