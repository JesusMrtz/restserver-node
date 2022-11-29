import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, login, refreshToken } from "../../controllers/auth.controller.js";
import { validateFields, validateJWT } from "../../middlewares/index.js";


const routes = Router();

routes.get('/', [
    validateJWT
], refreshToken);

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