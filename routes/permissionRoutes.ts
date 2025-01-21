import express from 'express';
import { RequestHandler, Request, Response } from 'express'; 
import { createPermission } from '../controllers/permissionController';
import { authenticateToken } from '../middleware/authMiddleware';

const permissionRouter = express.Router();

permissionRouter.post('/createPermission',authenticateToken, createPermission); 

export default permissionRouter;
