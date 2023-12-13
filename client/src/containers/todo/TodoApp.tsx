import React, { FC, useEffect, useState } from 'react';
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

interface TodoAppProps {
  todoTime: string;
  currentMonthTodos: currentMonthTodosType;
};

const TodoApp: FC<TodoAppProps> = ({
  todoTime,
  currentMonthTodos,
}) => {
  const [ userData ] = useUser();
  const navigate = useNavigate();
  const [ todoTab, onChangeTab ] = useTabs('all');
  const [ currentDateTodos, setCurrentDateTodos ] = useState(currentMonthTodos[todoTime]);
  const [ year, month, date ] = todoTime.split('-').map(Number);
  const qc = useQueryClient();

  useEffect(() => {
    setCurrentDateTodos(currentMonthTodos[todoTime]);
  }, [todoTime]);

  const addTodo = (value: string) => {
    if (!userData) {
      qc.setQueryData(['getCurrentMonthTodos'], {});
      navigate('/login');
    };
    if (!value || !value.trim()) return;
    
    const id = currentDateTodos?.id ? currentDateTodos.id : 0;
    const newTodos = { id, contents: [ `0${value}` ] };

    if (currentDateTodos) {
      newTodos.contents.unshift(...currentDateTodos.contents);
      updateDateTodos(
        id,
        newTodos.contents.join('&'),
        year,
        month-1,
      );
    } else {
      createDateTodos(
        newTodos.contents.join('&'),
        todoTime,
        year,
        month-1,
      );
    }

    setCurrentDateTodos(newTodos);
    currentMonthTodos[`${todoTime}`] = newTodos;
    qc.setQueryData(['getCurrentMonthTodos'], currentMonthTodos);
  };

  const shiftTodo = (content: string, index: number) => {
    if (!userData) {
      qc.setQueryData(['getCurrentMonthTodos'], {});
      navigate('/login')
    };

    const target = currentDateTodos.contents[index][0] === '1' ? '0' : '1';

    currentMonthTodos[`${todoTime}`].contents[index] = `${target}${content}`;
    qc.setQueryData(['getCurrentMonthTodos'], currentMonthTodos);
    updateDateTodos(
      currentDateTodos.id,
      currentDateTodos.contents.join('&'),
      year,
      month-1,
    );
  };

  const deleteTodo = (index: number) => {
    if (!userData) {
      qc.setQueryData(['getCurrentMonthTodos'], {})
      navigate('/login')
    };

    const newContents = [
      ...currentDateTodos.contents.slice(0, index),
      ...currentDateTodos.contents.slice(index + 1, currentDateTodos.contents.length),
    ];
    const newTodos = { id: currentDateTodos.id, contents: newContents };

    currentMonthTodos[`${todoTime}`] = newTodos;

    if (newContents.length < 1) {
      delete currentMonthTodos[`${todoTime}`];
      deleteDateTodos(
        currentDateTodos.id,
        year,
        month-1,
      );
    } else {
      updateDateTodos(
        currentDateTodos.id,
        newContents.join('&'),
        year,
        month-1,
      );
    }

    setCurrentDateTodos(newTodos);
    qc.setQueryData(['getCurrentMonthTodos'], currentMonthTodos);
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

export const TodoTitle = styled.h1`
  font-size: 28px;
  font-weigth: 800;
  color: #efeff1;
`;