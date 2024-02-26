import { Router } from 'express';
import { ProfessionalController } from '@/presentation/controllers/professional.controller';
import { validateSchema } from '@/main/middlewares/validate-schema';
import { AssignProjectsBodyDto } from '@/application/use-cases/utils/assign-projects-body.dto';

const professionalRouter = Router();

professionalRouter
  .route('/projects')
  .post(validateSchema(AssignProjectsBodyDto), ProfessionalController.assignProjectToTheProfessional);

export { professionalRouter };
