import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import connectDB from './config/db';
import userRouter from './routes/systemUserRoutes';
import authRouter from './routes/authRoutes';

const port = process.env.PORT;
const app = express();
app.use(express.json());

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


export default app;