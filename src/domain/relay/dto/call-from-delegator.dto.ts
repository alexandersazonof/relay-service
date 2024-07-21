import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ChainEnum } from 'src/domain/web3/constants/chain.enum';

export class CallFromDelegatorDto {
  @IsNotEmpty()
  @IsString()
  fromAddress: string;

  @IsNotEmpty()
  @IsString()
  target: string;

  @IsNotEmpty()
  @IsString()
  data: string;

  @IsOptional()
  @IsString()
  chain?: ChainEnum;
}
