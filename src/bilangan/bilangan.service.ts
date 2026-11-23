import { Injectable } from '@nestjs/common';
import { keBilanganBulat } from '../common/validasi';

@Injectable()
export class BilanganService {
  cek(angkaParam: string) {
    const angka = keBilanganBulat(angkaParam, 'angka', 1, 100);

    return {
      angka,
      jenis: angka % 2 === 0 ? 'genap' : 'ganjil',
      kuadrat: angka * angka,
      kelipatanLima: angka % 5 === 0,
    };
  }
}
