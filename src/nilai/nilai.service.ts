
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class NilaiService {
  hitung(body: any) {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      throw new BadRequestException('Body harus berupa object');
    }

    const { nama, tugas, uts, uas } = body;

    // Validasi nama
    if (typeof nama !== 'string' || nama.trim() === '') {
      throw new BadRequestException('Nama wajib diisi');
    }

    // Validasi tugas
    if (!Array.isArray(tugas) || tugas.length === 0) {
      throw new BadRequestException(
        'Tugas harus berupa array dan minimal 1 nilai',
      );
    }

    for (let i = 0; i < tugas.length; i++) {
      if (
        typeof tugas[i] !== 'number' ||
        !Number.isFinite(tugas[i]) ||
        tugas[i] < 0 ||
        tugas[i] > 100
      ) {
        throw new BadRequestException(
          `Nilai tugas ke-${i + 1} harus angka antara 0 sampai 100`,
        );
      }
    }

    // Validasi UTS dan UAS
    for (const [label, nilai] of [['UTS', uts], ['UAS', uas]] as const) {
      if (
        typeof nilai !== 'number' ||
        !Number.isFinite(nilai) ||
        nilai < 0 ||
        nilai > 100
      ) {
        throw new BadRequestException(
          `${label} harus berupa angka antara 0 sampai 100`,
        );
      }
    }

    // Menghitung rata-rata tugas
    const rataTugas =
      tugas.reduce((total, nilai) => total + nilai, 0) / tugas.length;

    // Menghitung nilai akhir: tugas 30%, UTS 30%, UAS 40%
    const nilaiAkhir = Math.round(
      (rataTugas * 0.3 + uts * 0.3 + uas * 0.4) * 100,
    ) / 100;

    // Menentukan predikat
    let predikat: string;

    if (nilaiAkhir >= 90) {
      predikat = 'A';
    } else if (nilaiAkhir >= 80) {
      predikat = 'B';
    } else if (nilaiAkhir >= 70) {
      predikat = 'C';
    } else {
      predikat = 'D';
    }

    // Mengembalikan hasil
    return {
      nama: nama.trim(),
      rataTugas,
      nilaiAkhir,
      predikat,
      status: nilaiAkhir >= 75 ? 'Lulus' : 'Remedial',
    };
  }
}
