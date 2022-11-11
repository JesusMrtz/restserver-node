import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, login } from "../../controllers/auth.controller.js";
import { validateFields } from "../../middlewares/validateFields.js";


const routes = Router();

routes.post('/login', [
    check('email', 'El correo es obligatorio').trim().normalizeEmail().isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validateFields
], login);

routes.post('/google', [
    check('id_token', 'id_token es necesario').notEmpty(),
    validateFields
], googleSignIn);

export default routes;