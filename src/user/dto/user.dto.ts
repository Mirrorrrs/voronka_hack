import { IsArray, IsNotEmpty, isNumber, IsNumber, IsString } from "class-validator";

export class TransactionDto {
  @IsNotEmpty()
  @IsNumber()
  sender_id: number;
  @IsNotEmpty()
  @IsString()
  sender_hash: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class UpdateStaticData {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  camp_member_id: number;

  @IsNotEmpty()
  @IsNumber()
  group_member_id: number;

  @IsNotEmpty()
  @IsNumber()
  role: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  new_password: string;
}

export class SetChildren {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
  @IsNotEmpty()
  @IsArray()
  children_add: number[];
  @IsNotEmpty()
  @IsArray()
  children_delete: number[];
}
