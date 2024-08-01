import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserNonceDto {
  @IsNotEmpty()
  @IsString()
  address: string;
}
