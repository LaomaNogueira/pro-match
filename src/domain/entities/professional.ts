import { IProfessional } from '@/domain/entities/utils/professional.interface';
import { InternetTest } from '@/domain/entities/utils/internet-test';
import { PastExperiences } from '@/domain/entities/utils/past-experiences';
import { EducationLevel } from '@/application/use-cases/utils/education-level.enum';

export class Professional implements IProfessional {
  age: number;
  educationLevel: EducationLevel;
  pastExperiences: PastExperiences;
  internetTest: InternetTest;
  writingScore: number;
  referralCode?: string;

  constructor(data: IProfessional) {
    this.age = data.age;
    this.educationLevel = data.educationLevel;
    this.pastExperiences = new PastExperiences(data.pastExperiences);
    this.internetTest = new InternetTest(data.internetTest);
    this.writingScore = data.writingScore;
    this.referralCode = data.referralCode;
  }

  public isOfLegalAge(): boolean {
    const professionalIsOfLegalAge = this.age >= 18;

    return professionalIsOfLegalAge;
  }
}
