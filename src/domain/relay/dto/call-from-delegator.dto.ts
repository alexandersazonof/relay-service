import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CallFromDelegatorDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  target: string;

  @IsNotEmpty()
  @IsString()
  data: string;

  @IsInt()
  @Min(0)
  userNonce: number;

  @IsInt()
  @Min(0)
  userDeadline: number;
}
