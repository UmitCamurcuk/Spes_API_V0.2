import express from 'express';
import { RequestHandler, Request, Response } from 'express'; // Import RequestHandler
import { loginUser } from '../controllers/authController'; // ...

const authRouter = express.Router();

authRouter.post('/login', loginUser as RequestHandler); // Cast to RequestHandler

export default authRouter;
