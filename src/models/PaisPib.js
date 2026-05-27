import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const PaisPib = sequelize.define(
  "paises_pib",
  {
    nombre: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    pib_2019: {
      type: DataTypes.INTEGER,
    },
    pib_2020: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default PaisPib;