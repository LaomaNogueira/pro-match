import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { EducationLevel } from '@/application/use-cases/utils/education-level.enum';

class PastExperiences {
  @IsBoolean()
  sales: boolean;

  @IsBoolean()
  support: boolean;
}

class InternetTest {
  @IsNumber()
  download_speed: number;

  @IsNumber()
  upload_speed: number;
}

export class AssignProjectsBodyDto {
  @IsNumber()
  age: number;

  @IsEnum(EducationLevel)
  education_level: EducationLevel;

  @ValidateNested()
  @Type(() => PastExperiences)
  past_experiences: PastExperiences;

  @ValidateNested()
  @Type(() => InternetTest)
  internet_test: InternetTest;

  @IsNumber()
  writing_score: number;

  @IsString()
  referral_code?: string;
}
