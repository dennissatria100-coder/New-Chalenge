import { Controller, Get, Query } from '@nestjs/common';
import { SuhuService } from './suhu.service';
import { KonversiSuhuDto } from './dto/konversi.suhu.dto';


@Controller('suhu')
export class SuhuController {
  constructor(private readonly suhuService: SuhuService) {}

  @Get('konversi')
  konversi(@Query() query: KonversiSuhuDto) {
    return this.suhuService.konversi(
      String(query.nilai),
      query.dari,
      query.ke,
    );
  }
}
