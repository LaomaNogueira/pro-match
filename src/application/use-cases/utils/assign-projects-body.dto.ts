import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from 'class-validator';
import { EducationLevel } from '@/application/use-cases/utils/education-level.enum';

class PastExperiences {
  @IsNotEmpty()
  @IsBoolean()
  sales: boolean;

  @IsNotEmpty()
  @IsBoolean()
  support: boolean;
}

class InternetTest {
  @IsNotEmpty()
  @IsNumber()
  download_speed: number;

  @IsNotEmpty()
  @IsNumber()
  upload_speed: number;
}

export class AssignProjectsBodyDto {
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsEnum(EducationLevel)
  education_level: EducationLevel;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PastExperiences)
  past_experiences: PastExperiences;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => InternetTest)
  internet_test: InternetTest;

  @IsNotEmpty()
  @IsNumber()
  writing_score: number;

  @IsNotEmpty()
  @IsString()
  referral_code?: string;
}
