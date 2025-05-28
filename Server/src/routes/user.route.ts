import express from 'express';
import { authenticate } from '../middleware/auth';
import { assignRole, getProfile, updateName } from '../controllers/user.controller';

const router = express.Router();

router.post('/role', authenticate, assignRole);
router.get('/profile', authenticate, getProfile);
router.put('/update', authenticate, updateName);

export default router;
