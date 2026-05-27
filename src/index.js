import express from "express";
import { sequelize } from "./database/database.js";
import paisesRoutes from "./routes/paises.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static("src/public"));

// Rutas
app.use(paisesRoutes);

async function main() {
  try {

    // Verificar conexión
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");

    // Sincronizar tablas
    await sequelize.sync({ force: false });
    console.log("Tablas sincronizadas.");

    // Levantar servidor
    app.listen(3000, () => {
      console.log("Servidor escuchando en el puerto 3000...");
    });

  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

main();