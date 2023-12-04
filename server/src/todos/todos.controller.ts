import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateDateTodosDto } from './dto/createDateTodos.dto';
import { UpdateDateTodosDto } from './dto/updateDateTodos.dto';
import { User } from 'src/common/decorator/user.decorator';
import { Users } from 'src/entities/Users';
import { IsAuthenicatedGuard } from 'src/auth/local.auth.guard';

@Controller('api/todos')
export class TodosController {
  constructor(
    private todosService: TodosService,
  ) {}

  @UseGuards(IsAuthenicatedGuard)
  @Get()
  async getCurrentMonthTodos(
    @Query('y', ParseIntPipe) year: number,
    @Query('mi', ParseIntPipe) monthIndex: number,
    @User() user: Users,
  ) {
    return await this.todosService.getCurrentMonthTodos(user.id, year, monthIndex);
  };

  @UseGuards(IsAuthenicatedGuard)
  @Post()
  async createDateTodos(
    @Body() dto: CreateDateTodosDto,
    @User() user: Users,
  ) {
    return await this.todosService.createDateTodos(dto.contents, dto.date, user.id);
  };

  @UseGuards(IsAuthenicatedGuard)
  @Put()
  async updateDateTodos(
    @Body() dto: UpdateDateTodosDto,
  ) {
    return this.todosService.updateDateTodos(dto.todosId, dto.contents);
  };

  @UseGuards(IsAuthenicatedGuard)
  @Delete()
  async deleteDateTodos(
    @Query('ti', ParseIntPipe) todosId: number,
  ) {
    return this.todosService.deleteDateTodos(todosId);
  }
}