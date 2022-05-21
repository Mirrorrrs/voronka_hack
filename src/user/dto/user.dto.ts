import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
