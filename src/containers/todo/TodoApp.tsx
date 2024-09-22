import React, { FC } from 'react';
import styled from '@emotion/styled';
import TodoList from 'Components/todo/TodoList';
import TodoInput from 'Components/todo/TodoInput';
import { useQueryClient } from '@tanstack/react-query';
import { createDateTodos, deleteDateTodos, updateDateTodos } from 'Api/todosApi';
import TodoTitle from 'Components/todo/TodoTitle';
import useTodos from 'Hooks/useTodos';
import TodoInit from 'Components/todo/TodoInit';
import { GET_TODOS_LIST_KEY } from 'Lib/queryKeys';
import { useAppSelector } from 'Hooks/reduxHooks';

interface TodoAppProps {};

const TodoApp: FC<TodoAppProps> = ({}) => {
  const qc = useQueryClient();
  const { todoTime } = useAppSelector(state => state.todoTime);
  const [ todosStatus, todosData, todosDataRefetch ] = useTodos(todoTime);

  const addTodo = async (contents: string) => {
    if (!contents || contents.length > 30) return;

    await createDateTodos(
      contents,
      todoTime,
    );
    todosDataRefetch();
    await qc.refetchQueries([GET_TODOS_LIST_KEY]);
  };

  const updateTodo = async (
    todosId: number,
    contents: string,
    isComplete: boolean,
    ) => {

    await updateDateTodos(
      todosId,
      contents,
      isComplete,
      todoTime,
    );
    todosDataRefetch();
    await qc.refetchQueries([GET_TODOS_LIST_KEY]);
  };

  const deleteTodo = async (todosId: number) => {
    await deleteDateTodos(
      todosId,
      todoTime,
    );
    todosDataRefetch();
    await qc.refetchQueries([GET_TODOS_LIST_KEY]);
  };

  return (
    <Container>
      {todoTime ?
        <>
        <TodoTitle
          todoTime={todoTime}/>
        <TodoInput
          addTodo={addTodo} />
        <TodoList
          todosStatus={todosStatus}
          todosData={todosData}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo} />
        </> :
        <TodoInit />
      }
    </Container>
  );
};

export default TodoApp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 10px;
`;