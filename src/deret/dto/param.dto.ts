
import { IsIn, IsString } from 'class-validator';

export class DeretParamDto {
  @IsString()
  @IsIn(['fibonacci', 'ganjil', 'genap', 'prima'], {
    message: 'Jenis deret tidak valid',
  })
  jenis: string;
}
