import { BadRequestException, Injectable } from '@nestjs/common';
import { keBilanganBulat } from '../common/validasi';

const JENIS = ['ganjil', 'genap', 'kuadrat'];

@Injectable()
export class DeretService {
  buat(jenisParam: string, jumlahQ: string, urutanQ?: string) {
    if (!JENIS.includes(jenisParam)) {
      throw new BadRequestException(
        'jenis harus salah satu: ganjil, genap, kuadrat',
      );
    }

    const jumlah = keBilanganBulat(jumlahQ, 'jumlah', 1, 20);

    // Tantangan: query urutan (opsional)
    let urutan = 'asc';
    if (urutanQ !== undefined) {
      if (urutanQ !== 'asc' && urutanQ !== 'desc') {
        throw new BadRequestException('urutan harus asc atau desc');
      }
      urutan = urutanQ;
    }

    const data: number[] = [];
    let total = 0;
    for (let i = 1; i <= jumlah; i++) {
      let nilai: number;
      if (jenisParam === 'ganjil') nilai = 2 * i - 1;
      else if (jenisParam === 'genap') nilai = 2 * i;
      else nilai = i * i;

      data.push(nilai);
      total += nilai;
    }

    if (urutan === 'desc') data.reverse();

    return { jenis: jenisParam, jumlah, data, total };
  }
}
