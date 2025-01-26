import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { createPermissionGroup, getPermissionGroups } from '../controllers/permissionGroupController';

const permissionGroupRouter = express.Router();

permissionGroupRouter.post('/createPermissionGroup',authenticateToken, createPermissionGroup); 
permissionGroupRouter.get('/getPermissionGroups',authenticateToken, getPermissionGroups); 

export default permissionGroupRouter;
