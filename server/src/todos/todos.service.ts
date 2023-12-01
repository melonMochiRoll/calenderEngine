import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Todos } from "src/entities/Todos";
import { todosWithoutUserId } from "src/typings/types";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
  ) {}

  async getCurrentMonthTodos(
    UserId: number,
    year: number,
    monthIndex: number,
  ) {

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

    return result;
  };

  async createDateTodos(
    contents: string,
    date: string,
    UserId: number,
  ) {
    return await this.todosRepository.save({ contents, date, UserId });
  };

  async updateDateTodos(
    todosId: number,
    contents: string,
  ) {
    return await this.todosRepository.update({ id: todosId }, { contents });
  };

  async deleteDateTodos(
    todosId: number,
  ) {
    return await this.todosRepository.delete(todosId);
  };
}