import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ) {
    const user = await this.usersService.getOneByEmail(email);

    if (user && user.password === password) {
      const { password, ...rest} = user;
      return rest;
    }

    return null;
  }
}