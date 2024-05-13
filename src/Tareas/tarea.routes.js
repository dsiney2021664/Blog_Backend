import { Router } from "express";
import { check } from "express-validator";
import {
    createTarea,
    createComment,
    updateTarea,
    deleteTarea,
    getTareas,
} from "./tarea.controller.js";
import {validarCampos} from "../middlewares/validar-campos.js"

const router = Router();

router.post(
    "/",
    [
        check("title", "El título es necesario").notEmpty(),
        validarCampos
    ],
    createTarea
);

router.post(
    "/comments/:id",
    [
        check("text", "El texto del comentario es necesario").notEmpty(),
        check("author", "El autor del comentario es necesario").notEmpty(),
        validarCampos
    ],
    createComment
);

router.put(
    "/:id",
    [
        check("title", "El título es necesario").notEmpty(),
        validarCampos
    ],
    updateTarea
)

router.delete(
    "/:id", 
    deleteTarea
);

router.get(
    "/", 
    getTareas
);


export default router;