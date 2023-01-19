import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
    @ApiProperty({ example: "jackdorsi@gmail.com" })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "thi$ i$ jacks pa33" })
    @IsString()
    @IsNotEmpty()
    password: string;
}
