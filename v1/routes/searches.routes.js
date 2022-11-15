import { Router } from "express";
import { globalSearch } from "../../controllers/searches.controller.js";


const router = Router();

router.get('/:collection/:param', globalSearch);


export default router;