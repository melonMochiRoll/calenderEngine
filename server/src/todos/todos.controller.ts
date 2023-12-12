import { Body, Controller, Delete, Get, HttpCode, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateDateTodosDto } from './dto/createDateTodos.dto';
import { UpdateDateTodosDto } from './dto/updateDateTodos.dto';
import { User } from 'src/common/decorator/user.decorator';
import { Users } from 'src/entities/Users';
import { IsAuthenicatedGuard } from 'src/auth/local.auth.guard';

@UseGuards(IsAuthenicatedGuard)
@Controller('api/todos')
export class TodosController {
  constructor(
    private todosService: TodosService,
  ) {}

  @Get()
  async getCurrentMonthTodos(
    @Query('y', ParseIntPipe) year: number,
    @Query('mi', ParseIntPipe) monthIndex: number,
    @User() user: Users,
  ) {
    return await this.todosService.getCurrentMonthTodos(
      year,
      monthIndex,
      user.id,
    );
  };

  @Post()
  createDateTodos(
    @Body() dto: CreateDateTodosDto,
    @User() user: Users,
  ) {
    return this.todosService.createDateTodos(
      dto.contents,
      dto.date,
      dto.year,
      dto.monthIndex,
      user.id,
    );
  };

  @Put()
  updateDateTodos(
    @Body() dto: UpdateDateTodosDto,
    @User() user: Users,
  ) {
    return this.todosService.updateDateTodos(
      dto.todosId,
      dto.contents,
      dto.year,
      dto.monthIndex,
      user.id
    );
  };

  @Delete()
  @HttpCode(204)
  deleteDateTodos(
    @Query('ti', ParseIntPipe) todosId: number,
    @Query('y', ParseIntPipe) year: number,
    @Query('mi', ParseIntPipe) monthIndex: number,
    @User() user: Users,
  ) {
    return this.todosService.deleteDateTodos(
      todosId,
      year,
      monthIndex,
      user.id
    );
  }
}