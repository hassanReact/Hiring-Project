import { Router } from "express";
import { authentication, logout, verifyOtp } from "../controllers/auth.controller";

const router = Router()

router.post('/request-otp', authentication)
router.post('/verify-otp', verifyOtp)
router.get('/logout', logout)
export default router;