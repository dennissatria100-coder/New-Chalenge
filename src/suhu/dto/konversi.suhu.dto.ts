import { Type } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class KonversiSuhuDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'Nilai suhu harus berupa angka' })
  nilai: number;

  @IsNotEmpty({ message: 'Satuan asal tidak boleh kosong' })
  @IsIn(['celsius', 'fahrenheit', 'kelvin'], {
    message: 'Satuan asal harus celsius, fahrenheit, atau kelvin',
  })
  dari: string;

  @IsNotEmpty({ message: 'Satuan tujuan tidak boleh kosong' })
  @IsIn(['celsius', 'fahrenheit', 'kelvin'], {
    message: 'Satuan tujuan harus celsius, fahrenheit, atau kelvin',
  })
  ke: string;
}