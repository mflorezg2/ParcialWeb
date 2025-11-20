import { IsNotEmpty, IsNumber, IsString, IsUrl, IsHash, IsOptional, IsBoolean, IsDate} from "class-validator";
import { Status } from "../appointments/enum";

export class AppointmentsDto {

  @IsNotEmpty()
  @IsDate()
  readonly datetime:Date;

  @IsString()
  @IsNotEmpty()
  readonly status: Status;

  @IsDate()
  readonly created_at:Date;



}