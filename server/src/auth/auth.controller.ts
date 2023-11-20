import { Controller, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./local.auth.guard";
import { User } from "src/common/decorator/user.decorator";
import { Users } from "src/entities/Users";

@Controller('api/auth')
export class AuthController {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: Users) {
    return user;
  };
}