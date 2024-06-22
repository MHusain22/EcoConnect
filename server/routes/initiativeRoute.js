import express from "express";
import { addInitiative,getInitiative } from "../controller/initiativeController.js";
const router = express.Router();

router.post('/addinitiative', addInitiative);
router.get('/getinitiative', getInitiative);

export default router;