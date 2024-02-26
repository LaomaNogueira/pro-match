import { CalculateEligibilityScore } from '../../../../src/application/use-cases/calculate-eligibility-score';
import { IProfessional } from '../../../../src/domain/entities/utils/professional.interface';
import { EducationLevel } from '../../../../src/application/use-cases/utils/education-level.enum';

describe('SRC :: APPLICATION :: USE CASES :: CALCULATE ELIGIBILITY SCORE', () => {
  const calculateEligibilityScore: CalculateEligibilityScore = new CalculateEligibilityScore();

  describe('Given call #execute', () => {
    let defaultProfessionalMock: IProfessional;

    beforeEach(() => {
      defaultProfessionalMock = {
        age: 18,
        educationLevel: EducationLevel.NO_EDUCATION,
        pastExperiences: {
          sales: false,
          support: false
        },
        internetTest: {
          downloadSpeed: 49.1,
          uploadSpeed: 45.1
        },
        writingScore: 0.4
      };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    describe('When receiving data from a professional under 18 years of age', () => {
      test('Should return the score value equal 0', async () => {
        defaultProfessionalMock.age = 17;
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(0);
      });
    });

    describe('When receiving data from a professional aged 18 or over', () => {
      test('Should return score 1, for defaultProfessionalMock data', async () => {
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(1);
      });

      test('should return score 2, when education level from defaultProfessionalMock is changed to "high_school"', async () => {
        defaultProfessionalMock.educationLevel = EducationLevel.HIGH_SCHOOL;
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(2);
      });

      test('should return score 3, when education level from defaultProfessionalMock is changed to "bachelors_degree_or_high"', async () => {
        defaultProfessionalMock.educationLevel = EducationLevel.BACHELORS_DEGREE_OR_HIGH;
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(3);
      });

      test('should return score 4, when defaultProfessionalMock past support experience is changed to true', async () => {
        defaultProfessionalMock.pastExperiences.support = true;
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(4);
      });

      test('should return score 6, when defaultProfessionalMock past sales experience is changed to true', async () => {
        defaultProfessionalMock.pastExperiences.sales = true;
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(6);
      });

      test('should return score 0, when defaultProfessionalMock internet test download speed is changed to a value less than 5', async () => {
        defaultProfessionalMock.internetTest.downloadSpeed = 4.9;
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(0);
      });

      test('should return score 2, when defaultProfessionalMock internet test download speed is changed to a value greater than 50', async () => {
        defaultProfessionalMock.internetTest.downloadSpeed = 65.5;
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(2);
      });

      test('should return score 0, when defaultProfessionalMock internet test upload speed is changed to a value less than 5', async () => {
        defaultProfessionalMock.internetTest.downloadSpeed = 3.5;
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(0);
      });

      test('should return score 2, when defaultProfessionalMock internet test upload speed is changed to a value greater than 50', async () => {
        defaultProfessionalMock.internetTest.downloadSpeed = 50.1;
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(2);
      });

      test('should return score -1, when defaultProfessionalMock writing score is changed to a value less than 0.3', async () => {
        defaultProfessionalMock.writingScore = 0.2;
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(-1);
      });

      test('should return score 2, when defaultProfessionalMock writing score is changed to a value greater than 0.7', async () => {
        defaultProfessionalMock.writingScore = 0.8;
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(2);
      });

      test('should return score 2, when defaultProfessionalMock referral code is sent and valid', async () => {
        defaultProfessionalMock = { ...defaultProfessionalMock, referralCode: 'token1234' };
        const eligibilityScore = await calculateEligibilityScore.execute(defaultProfessionalMock);

        expect(eligibilityScore).toEqual(2);
      });
    });
  });
});
