import { Module } from '@nestjs/common';
import { BilanganController } from './bilangan/bilangan.controller';
import { BilanganService } from './bilangan/bilangan.service';
import { SuhuController } from './suhu/suhu.controller';
import { SuhuService } from './suhu/suhu.service';
import { DeretController } from './deret/deret.controller';
import { DeretService } from './deret/deret.service';
import { NilaiController } from './nilai/nilai.controller';
import { NilaiService } from './nilai/nilai.service';
import { KasirController } from './kasir/kasir.controller';
import { KasirService } from './kasir/kasir.service';

@Module({
  controllers: [
    BilanganController,
    SuhuController,
    DeretController,
    NilaiController,
    KasirController,
  ],
  providers: [
    BilanganService,
    SuhuService,
    DeretService,
    NilaiService,
    KasirService,
  ],
})
export class AppModule {}
