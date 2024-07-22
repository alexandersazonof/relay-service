import { IsNotEmpty, IsString } from 'class-validator';

export class GetContractErrorNameDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}
