import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { LocalAuthGuard } from "./local.auth.guard";

@Controller('api/auth')
export class AuthController {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return req.user;
  };
}