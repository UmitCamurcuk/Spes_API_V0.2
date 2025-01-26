import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getHistory } from '../controllers/HistoryController';

const historyRouter = express.Router();

historyRouter.get('/getHistory',authenticateToken, getHistory); 
export default historyRouter;
