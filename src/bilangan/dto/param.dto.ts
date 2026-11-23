
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class BilanganParamDto {
  @Type(() => Number)
  @IsInt({ message: 'Angka harus berupa bilangan bulat' })
  @Min(0, { message: 'Angka tidak boleh negatif' })
  angka: number;
}
