export interface AssignProjectsResponseDto {
  score: number;
  selectedProject: string;
  eligibleProjects: string[];
  ineligibleProjects: string[];
}

export interface ParsedAssignProjectsResponseDto {
  score: number;
  selected_project: string;
  eligible_projects: string[];
  ineligible_projects: string[];
}
