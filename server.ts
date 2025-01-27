import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import connectDB from './config/db';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRouter from './routes/systemUserRoutes';
import authRouter from './routes/authRoutes';
import permissionRouter from './routes/permissionRoutes';
import permissionGroupRouter from './routes/permissionGroupRoutes';
import historyRouter from './routes/historyRoutes';
import roleRouter from './routes/roleRoutes';


const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // React frontend'inizin adresi
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Desteklenen HTTP metotları
  credentials: true, 
}));
app.use(cookieParser());
async function startServer() {
  await connectDB(); // MongoDB'ye bağlanın
  const server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
  });

  return server;
}

startServer().catch(error => {
  console.error('Error starting the server:', error);
});

//ROUTERS
app.use('/api/users/',userRouter);
app.use('/api/auth/', authRouter);
app.use('/api/permission/', permissionRouter);
app.use('/api/permissionGroup/', permissionGroupRouter);
app.use('/api/history/', historyRouter);
app.use('/api/role/', roleRouter);
export default app;