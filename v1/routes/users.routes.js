import { Router } from 'express';
import { deletedUser, getAllUsers, createUser, updatedUser } from '../../controllers/users.controller.js';


const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updatedUser);
router.delete('/:id', deletedUser);


export default router;