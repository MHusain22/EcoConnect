import express from "express";
import { registerUser,loginUser,updateProfile } from "../controller/userController.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id',updateProfile);

export default router;