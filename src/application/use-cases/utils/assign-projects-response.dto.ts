export interface AssignProjectsResponseDto {
  score: number;
  selectedProject: string;
  eligibleProjects: string[];
  ineligibleProjects: string[];
}
