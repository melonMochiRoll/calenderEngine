import React, { FC } from 'react';
import styled from '@emotion/styled';
import { currentMonthTodosType } from 'Hooks/useTodos';
import TodoList from 'Components/todo/TodoList';
import TodoTabs from 'Components/todo/TodoTabs';
import TodoInput from 'Components/todo/TodoInput';
import useTabs from 'Hooks/useTabs';
import { useQueryClient } from '@tanstack/react-query';
import { createDateTodos, deleteDateTodos, updateDateTodos } from 'Api/todosApi';
import useUser from 'Hooks/useUser';
import { useNavigate } from 'react-router-dom';
import TodoTitle from 'Components/todo/TodoTitle';

interface TodoAppProps {
  todoTime: string;
  currentMonthTodos: currentMonthTodosType;
  refetch: Function;
};

const TodoApp: FC<TodoAppProps> = ({
  todoTime,
  currentMonthTodos,
  refetch,
}) => {
  const navigate = useNavigate();
  const [ userData ] = useUser();
  const [ todoTab, onChangeTab ] = useTabs('all');
  const qc = useQueryClient();

  const addTodo = async (value: string) => {
    if (!userData) {
      qc.setQueryData(['getCurrentMonthTodos'], {});
      refetch();
      navigate('/login');
    };
    if (!value || !value.trim()) return;

    await createDateTodos(value, todoTime);
    refetch();
  };

  const shiftTodo = async (
    todosId: number,
    contents: string,
    isComplete: boolean,
    ) => {
    if (!userData) {
      qc.setQueryData(['getCurrentMonthTodos'], {});
      refetch();
      navigate('/login');
    };

    await updateDateTodos(
      todosId,
      contents,
      isComplete,
      todoTime,
    );
    refetch();
  };

  const deleteTodo = async (todosId: number) => {
    if (!userData) {
      qc.setQueryData(['getCurrentMonthTodos'], {});
      refetch();
      navigate('/login');
    };
    
    await deleteDateTodos(
      todosId,
      todoTime,
    );
    refetch();
  };

  return (
    <Container>
      <TodoTitle
        todoTime={todoTime}/>
      <TodoInput
        addTodo={addTodo} />
      <TodoTabs
        todoTab={todoTab}
        onChangeTab={onChangeTab} />
      <TodoList
        todoTab={todoTab}
        currentDateTodos={currentMonthTodos[todoTime]}
        shiftTodo={shiftTodo}
        deleteTodo={deleteTodo} />
    </Container>
  );
};

export default TodoApp;

const Container = styled.div`
  display: flex;
  padding: 50px 0;
  flex-direction: column;
`;