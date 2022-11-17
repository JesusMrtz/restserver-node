import { Router } from "express";
import { check } from "express-validator";
import { allowedCollections } from "../../helpers/db-validators.js";
import { validateUploadedFile, validateFields, validateModels } from "../../middlewares/index.js";
import { loadFile, showImage, uploadCloudinaryFile, uploadFile } from "../../controllers/upload.controller.js";


const router = Router();

router.post('/',[
    validateUploadedFile
], loadFile);

router.put('/:collection/:id',[
    validateUploadedFile,
    check('id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields,
    validateModels
], uploadCloudinaryFile);

router.get('/:collection/:id', [
    check('id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], showImage);


export default router;