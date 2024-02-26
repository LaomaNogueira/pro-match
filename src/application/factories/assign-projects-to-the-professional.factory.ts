import { AssignProjectsToTheProfessional } from '@/application/use-cases/assign-projects-to-the-professional';
import { CalculateEligibilityScore } from '@/application/use-cases/calculate-eligibility-score';

export function assignProjectsToTheProfessionalFactory() {
  const calculateEligibilityScoreUseCase = new CalculateEligibilityScore();
  
  return new AssignProjectsToTheProfessional(calculateEligibilityScoreUseCase);
}
