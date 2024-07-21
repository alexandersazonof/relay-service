import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ChainEnum } from 'src/domain/web3/constants/chain.enum';

export class CallFromOperatorDto {
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

  @IsNotEmpty()
  @IsString()
  signature: string;

  @IsOptional()
  @IsNumber()
  userNonce: number = 0;

  @IsOptional()
  @IsNumber()
  userDeadline: number = 0;
}
