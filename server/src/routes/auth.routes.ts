import express from 'express';

import { login, logout, register } from '@controllers/auth.controller.ts';
import multer from 'multer';

const AuthRoutes = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/** PUBLIC */
AuthRoutes.post('/register', upload.single('attachement'), register);
AuthRoutes.post('/login', login);

/** PROTECTED */
AuthRoutes.post('/logout', logout);

export default AuthRoutes;