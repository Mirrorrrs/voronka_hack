import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SendReviewDto {
  @IsNotEmpty()
  marks: number[];
  @IsString()
  comment: string;
}
