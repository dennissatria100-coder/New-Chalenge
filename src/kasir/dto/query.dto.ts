
import { IsIn } from 'class-validator';

export class KasirQueryDto {
  @IsIn(['tunai', 'qris'], {
    message: 'Metode harus tunai atau qris',
  })
  metode: string;
}
