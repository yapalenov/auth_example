import express from 'express';
import { authRouter } from './routers/auth.router';
import { errorMiddleware } from './middlewares/error.middleware';
import { greetingRouter } from './routers/greeting.router';

export const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/greeting', greetingRouter);
app.use(errorMiddleware);
