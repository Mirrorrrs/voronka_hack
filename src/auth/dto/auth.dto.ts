import { IsNotEmpty, IsNumber } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsNumber()
  login: number;
  @IsNotEmpty()
  password: string;
}

export class SignUpDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  surname: string;
  @IsNotEmpty()
  second_name: string;
}
