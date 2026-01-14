import { createUser,loginUser} from "./login.controller.js";
import { verifyToken } from './login.middleware.js';
import { getMyApiKey } from './login.controller.js';
import express from 'express';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/apikey', verifyToken, getMyApiKey);
router.get('/profile', verifyToken, (req, res) => {
    res.send({ message: 'Token Valid', user: req.user });
});
export default router;