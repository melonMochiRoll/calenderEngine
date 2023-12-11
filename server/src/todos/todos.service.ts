import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Todos } from "src/entities/Todos";
import { todosWithoutUserId } from "src/typings/types";
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async getCurrentMonthTodos(
    UserId: number,
    year: number,
    monthIndex: number,
  ) {
    const cached = await this.cacheManager.get('getCurrentMonthTodos');

    if (cached) {
      return cached;
    }

    const now = `${year}-${monthIndex + 1}`;
    const next = monthIndex === 11 ?
      `${year + 1}-${1}` :
      `${year}-${monthIndex + 2}`;

    const searchResult: todosWithoutUserId[] = await this.todosRepository
      .find({
        select: {
          id: true,
          contents: true,
          date: true,
        },
        where: {
          UserId,
          date: Between(
            new Date(`${now}-1`),
            new Date(`${next}-1`)
          )
        },
        order: {
          date: 'ASC',
        }
      });

    const result = searchResult
      .reduce((acc: Object, item: todosWithoutUserId) => {
        acc[`${item.date}`] = {
          id: item.id,
          contents: item.contents.split('&'),
        };
        return acc;
      }, {});

    await this.cacheManager.set('getCurrentMonthTodos', result);

    return result;
  };

  async createDateTodos(
    contents: string,
    date: string,
    UserId: number,
  ) {
    return await this.todosRepository.save({ contents, date, UserId })
      .then(async (data) => {
        await this.cacheManager.del('getCurrentMonthTodos');
        return data;
      });
  };

  async updateDateTodos(
    todosId: number,
    contents: string,
  ) {
    return await this.todosRepository.update({ id: todosId }, { contents })
      .then(async (data) => {
        await this.cacheManager.del('getCurrentMonthTodos');
        return data;
      });
  };

  async deleteDateTodos(
    todosId: number,
  ) {
    return await this.todosRepository.delete(todosId)
      .then(async (data) => {
        await this.cacheManager.del('getCurrentMonthTodos');
        return data;
      });
  };
}