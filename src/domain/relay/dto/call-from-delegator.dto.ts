import { IsNotEmpty, IsString } from 'class-validator';

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
}
