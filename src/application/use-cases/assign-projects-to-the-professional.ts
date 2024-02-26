import { IProfessional } from '@/domain/entities/utils/professional.interface';
import { AssignProjectsResponseDto } from '@/application/use-cases/utils/assign-projects-response.dto';
import { CalculateEligibilityScore } from '@/application/use-cases/calculate-eligibility-score';
import * as projectsData from '@/infrastructure/sample-data/projects.mock.json';
import { IProject } from '@/domain/entities/utils/project.interface';
import { FilterProjectsResponseDto } from '@/application/use-cases/utils/filter-projects-response.dto';

export class AssignProjectsToTheProfessional {
  constructor(private readonly calculateEligibilityScoreUseCase: CalculateEligibilityScore) {}

  public async execute(data: IProfessional): Promise<AssignProjectsResponseDto> {
    const professionalScore = await this.calculateEligibilityScoreUseCase.execute(data);

    const { projects } = projectsData;

    const sortedProjects = projects.sort((projectA, projectB) => projectB.score - projectA.score);

    const filteredProjects = this.filterProjects(sortedProjects, professionalScore);

    return {
      score: professionalScore,
      ...filteredProjects
    };
  }

  private filterProjects(projects: IProject[], professionalScore: number): FilterProjectsResponseDto {
    const ineligibleProjects: string[] = [];
    const eligibleProjects: string[] = [];

    for (const project of projects) {
      if (professionalScore <= project.score) {
        ineligibleProjects.push(project.name);
        continue;
      }

      eligibleProjects.push(project.name);
    }

    const selectedProject = eligibleProjects.length ? eligibleProjects[0] : '';

    return {
      selectedProject,
      eligibleProjects,
      ineligibleProjects
    };
  }
}
