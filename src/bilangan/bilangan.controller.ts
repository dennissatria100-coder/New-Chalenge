
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BilanganService } from './bilangan.service';
import { BilanganParamDto } from './dto/param.dto';


@Controller('bilangan')
export class BilanganController {
  constructor(private readonly bilanganService: BilanganService) {}

  @Get(':angka')
  cek(@Param() params: BilanganParamDto) {
    return this.bilanganService.cek(String(params.angka));
  }
}
