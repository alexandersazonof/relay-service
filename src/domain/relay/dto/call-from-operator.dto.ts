import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CallFromOperatorDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  target: string;

  @IsNotEmpty()
  @IsString()
  data: string;

  @IsNotEmpty()
  @IsString()
  signature: string;

  @IsInt()
  @Min(0)
  userNonce: number;

  @IsInt()
  @Min(0)
  userDeadline: number;
}
