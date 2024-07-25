import { IsNotEmpty, IsString } from 'class-validator';

export class ExecuteCallFromOperatorDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  fromPrivateKey: string;

  @IsNotEmpty()
  @IsString()
  target: string;

  @IsNotEmpty()
  @IsString()
  data: string;
}
