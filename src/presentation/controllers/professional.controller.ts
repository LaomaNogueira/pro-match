import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { IProfessional } from '@/domain/entities/utils/professional.interface';
import { StatusError } from '@/presentation/errors/status-error';
import { mapToCamelCase, mapToSnakeCase } from '@/application/helpers/object-key-mapper.helper';
import { assignProjectsToTheProfessionalFactory } from '@/application/factories/assign-projects-to-the-professional.factory';

export class ProfessionalController {
  static async assignProjectToTheProfessional(req: Request, res: Response): Promise<Response> {
    try {
      const { body } = req;
      const parsedBody: IProfessional = mapToCamelCase(body);

      const assignProjectsToTheProfessional = assignProjectsToTheProfessionalFactory();

      const assignedProjects = await assignProjectsToTheProfessional.execute(parsedBody).catch((error) => {
        throw new StatusError(httpStatus.BAD_REQUEST, error);
      });
      
      const parsedAssignedProjects = mapToSnakeCase(assignedProjects);
      
      return res.status(httpStatus.OK).send(parsedAssignedProjects);
    } catch (error: any) {
      return res.status(error.status).send(error);
    }
  }
}
