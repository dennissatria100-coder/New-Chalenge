import { IsInt, Min, Max } from 'class-validator';

export class HitungNilaiDto {
  @IsInt({ message: 'Nilai matematika harus berupa angka bulat' })
  @Min(0)
  @Max(100)
  matematika: number;

  @IsInt({ message: 'Nilai bahasa Indonesia harus berupa angka bulat' })
  @Min(0)
  @Max(100)
  bahasaIndonesia: number;

  @IsInt({ message: 'Nilai bahasa Inggris harus berupa angka bulat' })
  @Min(0)
  @Max(100)
  bahasaInggris: number;
}