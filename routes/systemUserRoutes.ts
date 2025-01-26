import { Router } from "express";
import { editSystemUser, getUser, getUsers, registerUser } from "../controllers/SystemUserController";
import { authenticateToken } from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post('/register', authenticateToken, registerUser);
userRouter.put('/updateUser/:id', authenticateToken, editSystemUser);
userRouter.get('/getUsers', authenticateToken, getUsers);
userRouter.post('/getUser', authenticateToken, getUser);

export default userRouter;