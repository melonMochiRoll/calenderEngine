import React, { FC, useCallback, useEffect, useState } from 'react';
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
  currentTime: string;
  currentMonthTodos: currentMonthTodosType;
};

const TodoApp: FC<TodoAppProps> = ({
  currentTime,
  currentMonthTodos,
}) => {
  const [ userData ] = useUser();
  const navigate = useNavigate();
  const [ todoTab, onChangeTab ] = useTabs('all');
  const [ currentDateTodos, setCurrentDateTodos ] = useState(currentMonthTodos[currentTime]);
  const [ year, month, date ] = currentTime.split('-').map(Number);
  const qc = useQueryClient();

  useEffect(() => {
    setCurrentDateTodos(currentMonthTodos[currentTime]);
  }, [currentTime]);

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
      updateDateTodos(id, newTodos.contents.join('&'));
    } else {
      createDateTodos(newTodos.contents.join('&'), currentTime);
    }

    setCurrentDateTodos(newTodos);
    currentMonthTodos[`${currentTime}`] = newTodos;
    qc.setQueryData(['getCurrentMonthTodos'], currentMonthTodos);
  };

  const shiftTodo = (content: string, index: number) => {
    if (!userData) {
      qc.setQueryData(['getCurrentMonthTodos'], {});
      navigate('/login')
    };

    const target = currentDateTodos.contents[index][0] === '1' ? '0' : '1';

    currentMonthTodos[`${currentTime}`].contents[index] = `${target}${content}`;
    qc.setQueryData(['getCurrentMonthTodos'], currentMonthTodos);
    updateDateTodos(currentDateTodos.id, currentDateTodos.contents.join('&'));
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

    currentMonthTodos[`${currentTime}`] = newTodos;

    if (newContents.length < 1) {
      delete currentMonthTodos[`${currentTime}`];
      deleteDateTodos(currentDateTodos.id);
    } else {
      updateDateTodos(currentDateTodos.id, newContents.join('&'));
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