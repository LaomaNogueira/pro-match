import { IProject, IProjectsData } from '@/domain/entitites/utils/project.interface';

export class ProjectsManager {
  private projects: IProject[];

  constructor(data: IProjectsData) {
    this.projects = data.projects;
  }

  public getProjects(): IProject[] {
    return this.projects;
  }
}
