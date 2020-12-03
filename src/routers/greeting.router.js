import { Router } from 'express';
import { greetingController } from '../controllers/greeting.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const greetingRouter = Router();

greetingRouter.get('/', authMiddleware, greetingController.greeting);
