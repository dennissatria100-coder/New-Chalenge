import { BadRequestException, Injectable } from '@nestjs/common';
import { bulat2 } from '../common/validasi';

const DISKON_MEMBER: Record<string, number> = {
  reguler: 0,
  silver: 5,
  gold: 10,
};
const METODE = ['tunai', 'qris'];

@Injectable()
export class KasirService {
  private validasiItems(items: any) {
    if (!Array.isArray(items)) {
      throw new BadRequestException('items harus berupa array');
    }
    if (items.length === 0) {
      throw new BadRequestException('items tidak boleh kosong');
    }
    if (items.length > 10) {
      throw new BadRequestException('items maksimal 10 item');
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const no = i + 1;

      if (item === null || typeof item !== 'object' || Array.isArray(item)) {
        throw new BadRequestException(`Item ke-${no}: harus berupa objek`);
      }
      if (typeof item.nama !== 'string' || item.nama.trim() === '') {
        throw new BadRequestException(
          `Item ke-${no}: nama harus string tidak kosong`,
        );
      }
      if (
        typeof item.harga !== 'number' ||
        !Number.isFinite(item.harga) ||
        item.harga <= 0
      ) {
        throw new BadRequestException(
          `Item ke-${no}: harga harus angka lebih dari 0`,
        );
      }
      if (
        typeof item.qty !== 'number' ||
        !Number.isInteger(item.qty) ||
        item.qty <= 0
      ) {
        throw new BadRequestException(
          `Item ke-${no}: qty harus bilangan bulat lebih dari 0`,
        );
      }
    }
  }

  private hitungTotal(items: any[], member: string, metode: string) {
    const rincian = items.map((item) => ({
      nama: item.nama.trim(),
      harga: item.harga,
      qty: item.qty,
      subtotal: bulat2(item.harga * item.qty),
    }));

    let totalItem = 0;
    let subtotal = 0;
    for (const r of rincian) {
      totalItem += r.qty;
      subtotal += r.subtotal;
    }

    const diskon = bulat2((subtotal * DISKON_MEMBER[member]) / 100);
    const biayaAdmin =
      metode === 'qris' ? bulat2(((subtotal - diskon) * 1) / 100) : 0;
    const total = bulat2(subtotal - diskon + biayaAdmin);

    return {
      member,
      metode,
      rincian,
      totalItem,
      subtotal: bulat2(subtotal),
      diskon,
      biayaAdmin,
      total,
    };
  }

  checkout(memberParam: string, metodeQ: string, body: any) {
    // member (params)
    const member =
      typeof memberParam === 'string' ? memberParam.trim().toLowerCase() : '';
    if (!(member in DISKON_MEMBER)) {
      throw new BadRequestException(
        'member harus salah satu: reguler, silver, gold',
      );
    }

    // metode (query)
    if (metodeQ === undefined || metodeQ === '') {
      throw new BadRequestException('Query metode wajib diisi');
    }
    const metode =
      typeof metodeQ === 'string' ? metodeQ.trim().toLowerCase() : '';
    if (!METODE.includes(metode)) {
      throw new BadRequestException('metode harus salah satu: tunai, qris');
    }

    // body
    if (body === undefined || body === null || typeof body !== 'object') {
      throw new BadRequestException('Body JSON wajib dikirim');
    }
    this.validasiItems(body.items);

    return this.hitungTotal(body.items, member, metode);
  }
}
