import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CallFromDelegatorDto {
  @IsOptional()
  @IsNumber()
  chainId: number = 250;

  @IsNotEmpty()
  @IsString()
  fromAddress: string;

  @IsNotEmpty()
  @IsString()
  target: string;

  @IsNotEmpty()
  @IsString()
  data: string;
}
