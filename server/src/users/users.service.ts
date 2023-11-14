import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/Users";
import { Repository } from "typeorm";
import 'dotenv/config';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async getOneById(
    id: number,
    ): Promise<Users> {
    return await this.usersRepository.findOneBy({ id });
  };

  async getOneByEmail(
    email: string,
    ): Promise<Users> {
    return await this.usersRepository.findOneBy({ email });
  };

  async createUser(
    email: string,
    password: string,
  ) {
    const result = await this.getOneByEmail(email);

    if (result) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    const hash = await bcrypt.hash(password, 11);
    await this.usersRepository.save({
      email,
      password: hash,
    });

    return true;
  };
}