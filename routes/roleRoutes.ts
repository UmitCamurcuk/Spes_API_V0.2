import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { createRole, getRoles } from '../controllers/roleController';

const roleRouter = express.Router();

roleRouter.post('/createRole',authenticateToken, createRole); 
roleRouter.get('/getRoles',authenticateToken, getRoles); 
export default roleRouter;
