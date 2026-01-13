import { createUser,loginUser } from "./login.controller.js";

import express from 'express';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);

export default router;