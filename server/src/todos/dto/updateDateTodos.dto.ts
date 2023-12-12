import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateDateTodosDto {

  @IsNotEmpty()
  @IsInt()
  todosId: number;

  @IsNotEmpty()
  @IsString()
  contents: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsInt()
  monthIndex: number;
};