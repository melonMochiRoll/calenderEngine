import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { Users } from "src/entities/Users";
import { UsersService } from "src/users/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly usersService: UsersService,
  ) {
    super();
  }

  serializeUser(user: Users, done: (err: Error, user: Users) => void) {
    done(null, user);
  };

  async deserializeUser(user: Users, done: (err: Error, user: Users) => void) {
    const result = await this.usersService.getOneById(user.id);
    return result ? done(null, result) : done(null, null);
  };
}