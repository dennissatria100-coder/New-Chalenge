import {
  Body,
  Controller,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { KasirService } from './kasir.service';
import { CheckoutDto } from './dto/checkout.dto';
import { KasirParamDto } from './dto/param.dto';
import { KasirQueryDto } from './dto/query.dto';

@Controller('kasir')
export class KasirController {
  constructor(
    private readonly kasirService: KasirService,
  ) {}

  @Post('checkout/:member')
  checkout(
    @Param() params: KasirParamDto,
    @Query() query: KasirQueryDto,
    @Body() body: CheckoutDto,
  ) {
    return this.kasirService.checkout(
      params.member,
      query.metode,
      body,
    );
  }
}