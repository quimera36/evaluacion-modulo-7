import Pais from "../models/Pais.js";
import PaisPib from "../models/PaisPib.js";
import PaisDataWeb from "../models/PaisDataWeb.js";
import { sequelize } from "../database/database.js";

export const listarPaises = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const offset = Number(req.query.offset) || 0;

    const paises = await Pais.findAll({
      include: PaisPib,
      limit,
      offset,
    });

    res.json(paises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los países" });
  }
};

export const crearPais = async (req, res) => {
  const { nombre, continente, poblacion, pib_2019, pib_2020 } = req.body;

  const transaction = await sequelize.transaction();

  try {
    await Pais.create(
      { nombre, continente, poblacion },
      { transaction }
    );

    await PaisPib.create(
      { nombre, pib_2019, pib_2020 },
      { transaction }
    );

    await PaisDataWeb.upsert(
      { nombre_pais: nombre, accion: "1" },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({ message: "País creado correctamente" });
  } catch (error) {
    await transaction.rollback();

    console.error(error);
    res.status(500).json({ message: "Error al crear el país" });
  }
};

export const eliminarPais = async (req, res) => {
  const { nombre } = req.params;

  const transaction = await sequelize.transaction();

  try {
    await PaisPib.destroy({
      where: { nombre },
      transaction,
    });

    await Pais.destroy({
      where: { nombre },
      transaction,
    });

 await PaisDataWeb.upsert(
  { nombre_pais: nombre, accion: "0" },
  { transaction }
);

    await transaction.commit();

    res.json({ message: "País eliminado correctamente" });
  } catch (error) {
    await transaction.rollback();

    console.error(error);
    res.status(500).json({ message: "Error al eliminar el país" });
  }
};