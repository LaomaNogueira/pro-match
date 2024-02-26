import { config } from 'dotenv';
import express from 'express';
import { setupRoutes } from '@/main/config/routes';
import { setupMiddlewares } from '@/main/config/setup-middlewares';

config();
const app = express();
setupMiddlewares(app);
setupRoutes(app);

export { app };
