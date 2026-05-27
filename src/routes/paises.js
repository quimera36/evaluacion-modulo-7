import { Router } from "express";
import {
  listarPaises,
  crearPais,
  eliminarPais,
} from "../controllers/paisesController.js";

const router = Router();

router.get("/paises", listarPaises);
router.post("/paises", crearPais);
router.delete("/paises/:nombre", eliminarPais);

export default router;