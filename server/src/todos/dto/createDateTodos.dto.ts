import { IsNotEmpty, IsString } from "class-validator";

export class CreateDateTodosDto {

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  date: string;
};