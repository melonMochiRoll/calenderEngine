import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { currentMonthTodosType } from 'Pages/MainPage';
import TodoList from 'Components/todo/TodoList';
import TodoTabs from 'Components/todo/TodoTabs';
import TodoInput from 'Components/todo/TodoInput';
import useTabs from 'Hooks/useTabs';
import { useQueryClient } from '@tanstack/react-query';

interface TodoAppProps {
  currentTime: string;
  currentMonthTodos: currentMonthTodosType;
};

const TodoApp: FC<TodoAppProps> = ({
  currentTime,
  currentMonthTodos,
}) => {
  const [ todoTab, onChangeTab ] = useTabs('all');
  const [ currentDateTodos, setCurrentDateTodos ] = useState(currentMonthTodos[currentTime]);
  const [ year, month, date ] = currentTime.split('&');
  const qc = useQueryClient();

  useEffect(() => {
    setCurrentDateTodos(currentMonthTodos[currentTime]);
  }, [currentTime]);

  const addTodo = (value: string) => {
    if (!value || !value.trim()) return;
    let newTodos = [{ title: value, isCompleted: false }];

    if (currentDateTodos) {
      newTodos.unshift(...currentDateTodos);
    }

    setCurrentDateTodos(newTodos);
    qc.setQueryData(['getCurrentMonthTodosKey'], {
      ...currentMonthTodos,
      [`${currentTime}`]: newTodos,
    });
  };

  const updateTodo = (index: number) => {
    currentDateTodos[index].isCompleted = !currentDateTodos[index].isCompleted;
    currentMonthTodos[currentTime] = currentDateTodos;
  };

  const deleteTodo = (index: number) => {
    const newTodos = [
      ...currentDateTodos.slice(0, index),
      ...currentDateTodos.slice(index + 1, currentDateTodos.length),
    ];

    currentMonthTodos[`${currentTime}`] = newTodos;

    if (newTodos.length < 1) {
      delete currentMonthTodos[`${currentTime}`];
    }

    qc.setQueryData(['getCurrentMonthTodosKey'], currentMonthTodos);
    setCurrentDateTodos(newTodos);
  };

  return (
    <Container>
      <TodoTitle>{`${year}년 ${month}월 ${date}일`}</TodoTitle>
      <TodoInput
        addTodo={addTodo} />
      <TodoTabs
        todoTab={todoTab}
        onChangeTab={onChangeTab} />
      <TodoList
        todoTab={todoTab}
        currentDateTodos={currentDateTodos}
        updateTodo={updateTodo}
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

export const TodoTitle = styled.h1`
  font-size: 28px;
  font-weigth: 800;
`;