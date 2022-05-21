import { IsNotEmpty, IsString } from 'class-validator';

export class makeAlert {
  @IsNotEmpty()
  @IsString()
  message: string
}