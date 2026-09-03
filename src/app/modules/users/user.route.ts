import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post('/register-patient', userController.createPatient  )

export const userRouter = router;