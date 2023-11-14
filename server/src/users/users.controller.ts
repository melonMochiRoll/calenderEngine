import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { IsNotAuthenicatedGuard } from "src/auth/local.auth.guard";

@Controller('api/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @UseGuards(IsNotAuthenicatedGuard)
  @Post()
  async createUser(@Body() dto: CreateUserDTO) {
    return this.usersService.createUser(dto.email, dto.password);
  };
}