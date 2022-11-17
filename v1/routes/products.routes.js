import { Router } from "express";
import { check } from "express-validator";
import { categoryExistsInDB } from "../../helpers/db-validators.js";
import { productExistsInDB } from "../../helpers/db-validators.js";
import { hasRole, validateFields, validateJWT } from '../../middlewares/index.js';
import { createProduct, deletedProduct, getAllProducts, getProduct, updatedProduct } from "../../controllers/products.controller.js";


const router = Router();

/** Obtener todas los productos
 * Tipo: Público
*/
router.get('/', getAllProducts);

router.get('/:id', [
    check('id', ['Producto no existe']).isMongoId(),
    check('id').custom(productExistsInDB),
    validateFields
], getProduct)

/** Crear producto
 * Tipo: Privado - cualquier persona con un token válido
*/
router.post('/', [ 
    validateJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('category_id').custom(categoryExistsInDB),
    validateFields
], createProduct);

/** Actualizar categoria
 * Tipo: Privado - Cualquier persona con token válido 
*/
router.put('/:id', [
    validateJWT,
    check('id', 'El usuario no existe en la base de datos').isMongoId(),
    check('id').custom(productExistsInDB),
    check('price', 'El precio debe ser un número').optional().isNumeric(),
    check('category_id').optional().custom(categoryExistsInDB),
    validateFields
]
, updatedProduct);

/** Eliminar categoria
 * Tipo: Privado . Persona con permisos de adminstrador con token válido
*/
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'El usuario no existe en la base de datos').isMongoId(),
    check('id').custom( productExistsInDB ),
    validateFields
], deletedProduct);


export default router;