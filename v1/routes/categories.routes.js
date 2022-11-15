import { Router } from 'express';
import { check } from 'express-validator';
import { hasRole, validateFields, validateJWT } from '../../middlewares/index.js';
import { categoryExistsInDB } from '../../helpers/validate-categories.js';
import { createCategory, deletedCategory, getAllCategories, getCategory, updatedCategory } from '../../controllers/categories.controller.js';


const router = Router();

/** Obtener todas la categorias
 * Tipo: Público
*/
router.get('/', getAllCategories);

router.get('/:id', [
    check('id', ['Categoria no existe']).isMongoId(),
    check('id').custom(categoryExistsInDB),
    validateFields
], getCategory)

/** Crear categoria
 * Tipo: Privado - cualquier persona con un token válido
*/
router.post('/', [ 
    validateJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    validateFields
], createCategory);

/** Actualizar categoria
 * Tipo: Privado - Cualquier persona con token válido 
*/
router.put('/:id', [
    validateJWT,
    check('id', 'El usuario no existe en la base de datos').isMongoId(),
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('id').custom(categoryExistsInDB),
    validateFields
]
, updatedCategory);

/** Eliminar categoria
 * Tipo: Privado . Persona con permisos de adminstrador con token válido
*/
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'El usuario no existe en la base de datos').isMongoId(),
    check('id').custom( categoryExistsInDB ),
    validateFields
], deletedCategory);


export default router;