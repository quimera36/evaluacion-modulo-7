import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import PaisPib from "./PaisPib.js";

const Pais = sequelize.define(
  "paises",
  {
    nombre: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    continente: {
      type: DataTypes.STRING,
    },
    poblacion: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Pais.hasOne(PaisPib, {
  foreignKey: "nombre",
});

PaisPib.belongsTo(Pais, {
  foreignKey: "nombre",
});

export default Pais;