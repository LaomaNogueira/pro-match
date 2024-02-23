export interface IProfessional {
    age: number;
    educationLevel: string;
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
