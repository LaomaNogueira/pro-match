import { createMock } from '@golevelup/ts-jest';
import { CalculateEligibilityScore } from '../../../../src/application/use-cases/calculate-eligibility-score';
import { AssignProjectsToTheProfessional } from '../../../../src/application/use-cases/assign-projects-to-the-professional';
import { IProfessional } from '../../../../src/domain/entities/utils/professional.interface';

describe('SRC :: APPLICATION :: USE CASES :: ASSIGN PROJECTS TO THE PROFESSIONAL', () => {
  const calculateEligibilityScoreMock: CalculateEligibilityScore = createMock<CalculateEligibilityScore>({
    execute: jest.fn()
  });
  const assignProjectsToTheProfessional: AssignProjectsToTheProfessional = new AssignProjectsToTheProfessional(
    calculateEligibilityScoreMock
  );

  describe('Given call #execute', () => {
    const calculateEligibilityScoreExecuteMock = calculateEligibilityScoreMock.execute;

    let defaultProfessionalMock: IProfessional;

    beforeEach(() => {
      defaultProfessionalMock = {
        age: 35,
        educationLevel: 'bachelors_degree_or_high',
        pastExperiences: {
          sales: true,
          support: false
        },
        internetTest: {
          downloadSpeed: 69.1,
          uploadSpeed: 5.1
        },
        writingScore: 0.8,
        referralCode: 'token1234'
      };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    describe('When receiving data from a professional under 18 years of age', () => {
      test('should return score equal 0 and no selected project for the professional', async () => {
        (calculateEligibilityScoreExecuteMock as jest.Mock).mockResolvedValue(0);

        const assignedProjects = await assignProjectsToTheProfessional.execute(defaultProfessionalMock);

        expect(calculateEligibilityScoreExecuteMock).toHaveBeenCalledWith(defaultProfessionalMock);
        expect(assignedProjects.score).toEqual(0);
        expect(assignedProjects.selectedProject).toBe('');
        expect(assignedProjects.eligibleProjects).toHaveLength(0);
      });
    });

    describe('When receiving data from a professional aged 18 or over', () => {
      test('should return "collect_information_for_xpto" as selected project, when a calculated score equals 3', async () => {
        (calculateEligibilityScoreExecuteMock as jest.Mock).mockResolvedValue(3);

        const assignedProjects = await assignProjectsToTheProfessional.execute(defaultProfessionalMock);

        expect(calculateEligibilityScoreExecuteMock).toHaveBeenCalledWith(defaultProfessionalMock);
        expect(assignedProjects.score).toEqual(3);
        expect(assignedProjects.selectedProject).toBe('collect_information_for_xpto');
        expect(assignedProjects.eligibleProjects).toEqual(['collect_information_for_xpto']);
        expect(assignedProjects.ineligibleProjects).toEqual([
          'calculate_dark_matter_nasa',
          'determine_schrodinger_cat_is_alive',
          'support_users_from_xyz'
        ]);
      });

      test('should return "support_users_from_xyz" as selected project, when a calculated score equals 5', async () => {
        (calculateEligibilityScoreExecuteMock as jest.Mock).mockResolvedValue(5);

        const assignedProjects = await assignProjectsToTheProfessional.execute(defaultProfessionalMock);

        expect(calculateEligibilityScoreExecuteMock).toHaveBeenCalledWith(defaultProfessionalMock);
        expect(assignedProjects.score).toEqual(5);
        expect(assignedProjects.selectedProject).toBe('support_users_from_xyz');
        expect(assignedProjects.eligibleProjects).toEqual(['support_users_from_xyz', 'collect_information_for_xpto']);
        expect(assignedProjects.ineligibleProjects).toEqual([
          'calculate_dark_matter_nasa',
          'determine_schrodinger_cat_is_alive'
        ]);
      });

      test('should return "determine_schrodinger_cat_is_alive" as selected project, when a calculated score equals 10', async () => {
        (calculateEligibilityScoreExecuteMock as jest.Mock).mockResolvedValue(10);

        const assignedProjects = await assignProjectsToTheProfessional.execute(defaultProfessionalMock);

        expect(calculateEligibilityScoreExecuteMock).toHaveBeenCalledWith(defaultProfessionalMock);
        expect(assignedProjects.score).toEqual(10);
        expect(assignedProjects.selectedProject).toBe('determine_schrodinger_cat_is_alive');
        expect(assignedProjects.eligibleProjects).toEqual([
          'determine_schrodinger_cat_is_alive',
          'support_users_from_xyz',
          'collect_information_for_xpto'
        ]);
        expect(assignedProjects.ineligibleProjects).toEqual(['calculate_dark_matter_nasa']);
      });
    });
  });
});
