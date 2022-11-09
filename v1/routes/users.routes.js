import { Router } from 'express';
import { check } from 'express-validator';
import { deletedUser, getAllUsers, createUser, updatedUser } from '../../controllers/users.controller.js';
import { userExistsInDB, validateEmail, validateRole } from '../../helpers/db-validators.js';
import { validateFields, validateJWT, hasRole } from '../../middlewares/index.js';


const router = Router();

router.get('/', getAllUsers);

router.post('/', [
    check('email').trim().normalizeEmail().custom( validateEmail ),
    check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('name', 'El nombre es obligatorio').notEmpty(),
    // check('role', 'No es un role válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( validateRole ),
    validateFields
], createUser);

router.put('/:id', [
    check('id', 'El usuario no existe en la base de datos').isMongoId(),
    //check('email').custom( updateEmail ),
    check('id').custom( userExistsInDB ),
    check('role').custom( validateRole ),
    validateFields
], updatedUser);

router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'El usuario no existe en la base de datos').isMongoId(),
    check('id').custom( userExistsInDB ),
    validateFields
], deletedUser);


export default router;