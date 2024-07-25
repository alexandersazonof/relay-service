import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CallFromDelegatorDto {
  @IsOptional()
  @IsNumber()
  chainId: number;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  target: string;

  @IsNotEmpty()
  @IsString()
  data: string;
}
