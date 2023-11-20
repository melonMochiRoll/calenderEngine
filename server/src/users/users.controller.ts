import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { IsNotAuthenicatedGuard } from "src/auth/local.auth.guard";
import { User } from "src/common/decorator/user.decorator";
import { Users } from "src/entities/Users";

@Controller('api/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Get()
  async getUser(@User() user: Users) {
    return user || false;
  };

  @UseGuards(IsNotAuthenicatedGuard)
  @Post()
  async createUser(@Body() dto: CreateUserDTO) {
    return this.usersService.createUser(dto.email, dto.password);
  };
}