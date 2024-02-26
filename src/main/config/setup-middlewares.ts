import { Express } from 'express';
import { bodyParser } from '@/main/middlewares/body-parser';
import { cors } from '@/main/middlewares/cors';
import { contentType } from '@/main/middlewares/content-type';
import { xPoweredBy } from '@/main/middlewares/x-powered-by';

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser);
  app.use(cors());
  app.use(contentType);
  app.use(xPoweredBy);
};
