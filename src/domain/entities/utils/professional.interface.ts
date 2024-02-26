import { EducationLevel } from '@/application/use-cases/utils/education-level.enum';

export interface IProfessional {
  age: number;
  educationLevel: EducationLevel;
  pastExperiences: {
    sales: boolean;
    support: boolean;
  };
  internetTest: {
    downloadSpeed: number;
    uploadSpeed: number;
  };
  writingScore: number;
  referralCode?: string;
}
