import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFriendDto {
    @IsNotEmpty({ message: 'ID penerima tidak boleh kosong' })
    @IsInt({ message: 'ID penerima harus berupa angka bulat' })
    @IsNumber({}, { message: 'ID penerima harus valid' })
    addresseeId: number;
}