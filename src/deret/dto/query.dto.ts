
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsIn,
  Min,
  Max,
} from 'class-validator';

export class DeretQueryDto {
  @Type(() => Number)
  @IsInt({ message: 'Jumlah harus berupa bilangan bulat' })
  @Min(1, { message: 'Jumlah minimal 1' })
  @Max(100, { message: 'Jumlah maksimal 100' })
  jumlah: number;

  @IsOptional()
  @IsIn(['asc', 'desc'], {
    message: 'Urutan hanya boleh asc atau desc',
  })
  urutan?: string;
}
