import { BadRequestException, Injectable } from '@nestjs/common';
import { bulat2, keAngka } from '../common/validasi';

const SATUAN = ['celsius', 'fahrenheit', 'kelvin'];

@Injectable()
export class SuhuService {
  konversi(nilaiQ: string, dariQ: string, keQ: string) {
    // 1. wajib diisi
    if (nilaiQ === undefined || dariQ === undefined || keQ === undefined) {
      throw new BadRequestException('Query nilai, dari, dan ke wajib diisi');
    }
    if (typeof dariQ !== 'string' || typeof keQ !== 'string') {
      throw new BadRequestException('Query dari dan ke harus berupa teks');
    }

    // 2. tipe & isi
    const nilai = keAngka(nilaiQ, 'nilai');
    const dari = dariQ.trim().toLowerCase();
    const ke = keQ.trim().toLowerCase();

    if (!SATUAN.includes(dari)) {
      throw new BadRequestException(
        'dari harus salah satu: celsius, fahrenheit, kelvin',
      );
    }
    if (!SATUAN.includes(ke)) {
      throw new BadRequestException(
        'ke harus salah satu: celsius, fahrenheit, kelvin',
      );
    }
    if (dari === ke) {
      throw new BadRequestException('Satuan dari dan ke tidak boleh sama');
    }
    if (dari === 'kelvin' && nilai < 0) {
      throw new BadRequestException('Nilai kelvin tidak boleh kurang dari 0');
    }

    // 3. proses: ubah ke Celsius dulu, lalu ke satuan tujuan
    let celsius: number;
    if (dari === 'celsius') celsius = nilai;
    else if (dari === 'fahrenheit') celsius = ((nilai - 32) * 5) / 9;
    else celsius = nilai - 273.15;

    let hasil: number;
    if (ke === 'celsius') hasil = celsius;
    else if (ke === 'fahrenheit') hasil = (celsius * 9) / 5 + 32;
    else hasil = celsius + 273.15;

    return {
      nilaiAsal: nilai,
      satuanAsal: dari,
      hasil: bulat2(hasil),
      satuanHasil: ke,
    };
  }
}
