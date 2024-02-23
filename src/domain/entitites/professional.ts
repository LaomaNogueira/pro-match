import { IProfessional } from '@/domain/entitites/utils/professional.interface';
import { InternetTest } from '@/domain/entitites/utils/internet-test';
import { PastExperiences } from '@/domain/entitites/utils/past-experiences';

export class Professional implements IProfessional {
  age: number;
  educationLevel: string;
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
