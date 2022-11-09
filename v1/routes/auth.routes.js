import { Router } from "express";
import { check } from "express-validator";
import { login } from "../../controllers/auth.controller.js";
import { validateFields } from "../../middlewares/validateFields.js";


const routes = Router();

routes.post('/login', [
    check('email', 'El correo es obligatorio').trim().normalizeEmail().isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

export default routes;