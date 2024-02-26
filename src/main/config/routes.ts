import { professionalRouter } from '@/main/config/routes/professional.router';
import { Express, Request, Response, Router } from 'express';

export function setupRoutes(app: Express): void {
  const router = Router();
  app.use('/api/v1', router);

  router.use('/healthz', (_request: Request, response: Response) => {
    try {
      return response.status(200).send({ status: 'up' });
    } catch (error: any) {
      return response.status(error.status).send(error);
    }
  });

  router.use('/pros/', professionalRouter);
}
