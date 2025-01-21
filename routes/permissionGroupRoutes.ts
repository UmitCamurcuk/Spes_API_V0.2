import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { createPermissionGroup } from '../controllers/permissionGroupController';

const permissionGroupRouter = express.Router();

permissionGroupRouter.post('/createPermissionGroup',authenticateToken, createPermissionGroup); 

export default permissionGroupRouter;
