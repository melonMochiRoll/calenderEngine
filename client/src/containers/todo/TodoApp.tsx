import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { currentMonthTodosType } from 'Pages/MainPage';
import TodoList from 'Components/todo/TodoList';
import TodoTabs from 'Components/todo/TodoTabs';
import TodoInput from 'Components/todo/TodoInput';

interface TodoAppProps {
  currentTime: string;
  currentMonthTodos: currentMonthTodosType;
  setCurrentMonthTodos: React.Dispatch<React.SetStateAction<currentMonthTodosType>>;
};

const TodoApp: FC<TodoAppProps> = ({
  currentTime,
  currentMonthTodos,
  setCurrentMonthTodos,
}) => {
  const [ todoTab, setTodoTab ] = useState('all');
  const [ currentDateTodos, setCurrentDateTodos ] = useState(currentMonthTodos[currentTime]);
  const [ year, month, date ] = currentTime.split('&');

  useEffect(() => {
    setCurrentDateTodos(currentMonthTodos[currentTime]);
  }, [currentTime]);

  const addTodo = (value: string) => {
    if (!value || !value.trim()) return;

    if (currentDateTodos) {
      const newTodos = [
        ...currentDateTodos,
        { title: value, isCompleted: false },
      ];
      setCurrentDateTodos(newTodos);
      setCurrentMonthTodos({
        ...currentMonthTodos,
        [`${currentTime}`]: newTodos,
      });
      return;
    }

    const newTodos = [{ title: value, isCompleted: false }];
    setCurrentDateTodos(newTodos);
    setCurrentMonthTodos({
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

    if (newTodos.length < 1) {
      const newMonthTodos = {
        ...currentMonthTodos
      };
      delete newMonthTodos[`${currentTime}`];
      setCurrentMonthTodos(newMonthTodos);
    } else {
      setCurrentMonthTodos({
        ...currentMonthTodos,
        [`${currentTime}`]: newTodos,
      });
    }

    setCurrentDateTodos(newTodos);
  };

  const onChangeTab = (e: React.SyntheticEvent, newValue: string) => {
    setTodoTab(newValue);
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