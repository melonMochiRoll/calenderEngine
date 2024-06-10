import React, { FC } from 'react';
import styled from '@emotion/styled';
import TodoList from 'Components/todo/TodoList';
import TodoTabs from 'Components/todo/TodoTabs';
import TodoInput from 'Components/todo/TodoInput';
import useTabs from 'Hooks/useTabs';
import { useQueryClient } from '@tanstack/react-query';
import { createDateTodos, deleteDateTodos, updateDateTodos } from 'Api/todosApi';
import useUser from 'Hooks/useUser';
import { useNavigate } from 'react-router-dom';
import TodoTitle from 'Components/todo/TodoTitle';
import { useTodosListQueryKey } from 'Hooks/useTodosList';
import useTodos from 'Hooks/useTodos';

interface TodoAppProps {
  todoTime: string;
  todosListDataRefetch: Function;
};

const TodoApp: FC<TodoAppProps> = ({
  todoTime,
  todosListDataRefetch,
}) => {
  const navigate = useNavigate();
  const [ userData, userDataRefetch ] = useUser();
  const [ todosStatus, todosData, todosDataRefetch ] = useTodos(todoTime);
  const [ todoTab, onChangeTab ] = useTabs('all');
  const qc = useQueryClient();

  const addTodo = async (contents: string) => {
    userDataRefetch();
    contents.trim();

    if (!userData) {
      qc.setQueryData([useTodosListQueryKey], {});
      navigate('/login');
    };
    if (!contents || contents.length > 30) return;

    await createDateTodos(
      contents,
      todoTime,
    );
    todosDataRefetch();
    todosListDataRefetch();
  };

  const shiftTodo = async (
    todosId: number,
    contents: string,
    isComplete: boolean,
    ) => {
    userDataRefetch();
    
    if (!userData) {
      qc.setQueryData([useTodosListQueryKey], {});
      navigate('/login');
    };

    await updateDateTodos(
      todosId,
      contents,
      isComplete,
      todoTime,
    );
    todosDataRefetch();
    todosListDataRefetch();
  };

  const deleteTodo = async (todosId: number) => {
    userDataRefetch();

    if (!userData) {
      qc.setQueryData([useTodosListQueryKey], {});
      navigate('/login');
    };
    
    await deleteDateTodos(
      todosId,
      todoTime,
    );
    todosDataRefetch();
    todosListDataRefetch();
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
        todosStatus={todosStatus}
        todosData={todosData}
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