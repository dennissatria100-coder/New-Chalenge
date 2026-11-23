
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Max,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';

export class ItemCheckoutDto {
  @IsString({ message: 'Nama harus berupa string' })
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  nama: string;

  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Harga harus berupa angka' },
  )
  @Min(0.01, { message: 'Harga harus lebih dari 0' })
  harga: number;

  @Type(() => Number)
  @IsInt({ message: 'Qty harus berupa bilangan bulat' })
  @Min(1, { message: 'Qty harus lebih dari 0' })
  qty: number;
}

export class CheckoutDto {
  @IsArray({ message: 'Items harus berupa array' })
  @ArrayMinSize(1, { message: 'Items tidak boleh kosong' })
  @ArrayMaxSize(10, { message: 'Items maksimal 10 item' })
  @ValidateNested({ each: true })
  @Type(() => ItemCheckoutDto)
  items: ItemCheckoutDto[];
}
