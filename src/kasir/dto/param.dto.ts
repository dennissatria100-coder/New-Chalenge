
import { IsIn } from 'class-validator';

export class KasirParamDto {
  @IsIn(['reguler', 'silver', 'gold'], {
    message: 'Member harus reguler, silver, atau gold',
  })
  member: string;
}
