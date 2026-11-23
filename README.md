# Latihan NestJS – Produktif RPL Kelas XI

Jawaban 5 soal latihan REST API NestJS (params, query, body) tanpa library tambahan dan tanpa database.

## Cara menjalankan
```bash
npm install
npm run start:dev
```
Server berjalan di http://localhost:3000

Buka `requests.http` di VS Code (ekstensi **REST Client**) untuk menguji semua endpoint,
termasuk kasus error (400). Bisa juga dipakai di Postman / Thunder Client.

## Endpoint
| Soal | Endpoint |
|------|----------|
| 1 | `GET /bilangan/:angka` |
| 2 | `GET /suhu/konversi?nilai=&dari=&ke=` |
| 3 | `GET /deret/:jenis?jumlah=&urutan=` (urutan = tantangan, opsional) |
| 4 | `POST /nilai/hitung` (status 200) |
| 5 | `POST /kasir/checkout/:member?metode=` |

## Struktur
```
src/
  common/validasi.ts      helper validasi & pembulatan
  bilangan/ suhu/ deret/ nilai/ kasir/
    *.controller.ts       menerima input & mengembalikan response
    *.service.ts          validasi + logika perhitungan
```
