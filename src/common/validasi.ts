import { BadRequestException } from '@nestjs/common';

/**
 * Mengubah nilai dari params/query (string) menjadi angka.
 * Urutan: (1) ada & tidak kosong, (2) tipe string, (3) bukan NaN.
 */
export function keAngka(nilai: unknown, namaField: string): number {
  if (nilai === undefined || nilai === null) {
    throw new BadRequestException(`${namaField} wajib diisi`);
  }
  if (typeof nilai !== 'string') {
    throw new BadRequestException(`${namaField} harus berupa satu nilai angka`);
  }
  if (nilai.trim() === '') {
    throw new BadRequestException(`${namaField} tidak boleh kosong`);
  }
  const angka = Number(nilai);
  if (Number.isNaN(angka) || !Number.isFinite(angka)) {
    throw new BadRequestException(`${namaField} harus berupa angka`);
  }
  return angka;
}

/** Bilangan bulat dalam rentang [min, max]. */
export function keBilanganBulat(
  nilai: unknown,
  namaField: string,
  min: number,
  max: number,
): number {
  const angka = keAngka(nilai, namaField);
  if (!Number.isInteger(angka)) {
    throw new BadRequestException(`${namaField} harus bilangan bulat`);
  }
  if (angka < min || angka > max) {
    throw new BadRequestException(
      `${namaField} harus antara ${min} sampai ${max}`,
    );
  }
  return angka;
}

/** Pembulatan maksimal 2 angka di belakang koma. */
export function bulat2(nilai: number): number {
  return Math.round(nilai * 100) / 100;
}
