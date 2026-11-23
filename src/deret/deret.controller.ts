
import { Controller, Get, Param, Query } from '@nestjs/common';
import { DeretService } from './deret.service'
import { DeretQueryDto } from './dto/query.dto';
import { DeretParamDto } from './dto/param.dto';

@Controller('deret')
export class DeretController {
  constructor(private readonly deretService: DeretService) {}

  @Get(':jenis')
  buat(
    @Param() params: DeretParamDto,
    @Query() query: DeretQueryDto,
  ) {
    return this.deretService.buat(
      params.jenis,
      String(query.jumlah),
      query.urutan,
    );
  }
}
