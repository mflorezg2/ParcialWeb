/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, IsUrl, IsHash, IsOptional, IsBoolean, IsDate} from "class-validator";

export class RolesDto {

    @IsString()
    @IsNotEmpty()
    readonly role_name: string;

    @IsOptional()
    @IsString()
    readonly description?: string;
    }
