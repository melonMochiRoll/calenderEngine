import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateDateTodosDto {

  @IsNotEmpty()
  @IsString()
  contents: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsInt()
  monthIndex: number;
};