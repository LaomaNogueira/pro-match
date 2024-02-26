import { IProfessional } from '@/domain/entities/utils/professional.interface';
import { Professional } from '@/domain/entities/professional';
import { IEducationLevel } from '@/domain/entities/utils/educational-level.interface';
import * as educationLevelsData from '@/infrastructure/mocks/education-levels.mock.json';
import { PastExperiences } from '@/domain/entities/utils/past-experiences';
import { InternetTest } from '@/domain/entities/utils/internet-test';
import { IReferralCode } from '@/domain/entities/utils/referral-code.interface';
import * as referralCodeData from '@/infrastructure/mocks/referral-codes.mock.json';

export class CalculateEligibilityScore {
  public async execute(data: IProfessional): Promise<number> {
    const professionalData = new Professional(data);
    const { educationLevel, pastExperiences, internetTest, writingScore, referralCode } = professionalData;
    let score = 0;

    if (professionalData.isOfLegalAge()) {
      score += this.calculateByEducationLevel(educationLevel);

      score += this.calculateByPastExperiences(pastExperiences);

      score += this.calculateByInternetTest(internetTest);

      score += this.calculateByWritingScore(writingScore);

      if (this.referralCodeIsValid(referralCode)) score++;

      return score;
    }

    return score;
  }

  private calculateByEducationLevel(level: string): number {
    const educationLevels: IEducationLevel[] = educationLevelsData.educationLevels;

    const foundEducationLevel = educationLevels.find((educationLevel) => educationLevel.level === level);

    return foundEducationLevel ? foundEducationLevel.score : 0;
  }

  private calculateByPastExperiences(pastExperiences: PastExperiences): number {
    let score = 0;

    if (pastExperiences.sales === true) score += 5;

    if (pastExperiences.support === true) score += 3;

    return score;
  }

  private calculateByInternetTest(data: InternetTest) {
    const { downloadSpeed, uploadSpeed } = data;
    let score = 0;

    if (downloadSpeed > 50) score++;
    if (downloadSpeed < 5) score--;

    if (uploadSpeed > 50) score++;
    if (uploadSpeed < 5) score--;

    return score;
  }

  private calculateByWritingScore(writingScore: number): number {
    let score = 0;

    if (writingScore < 0.3) {
      score--;
      return score;
    }

    if (writingScore > 0.7) {
      score += 2;
      return score;
    }

    score++;
    return score;
  }

  private referralCodeIsValid(referralCodeSent: string): boolean {
    const referralCodes: IReferralCode[] = referralCodeData.referralCodes;

    const foundReferralCodes = referralCodes.find((referralCode) => referralCode.code === referralCodeSent);

    return !!foundReferralCodes;
  }
}
