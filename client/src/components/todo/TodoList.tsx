import React, { FC } from 'react';
import styled from '@emotion/styled';
import TodoItem from 'Components/todo/TodoItem';
import TodoNull from 'Components/todo/TodoNull';
import { todoType } from 'Hooks/useTodos';

interface TodoListProps {
  todoTab: string;
  currentDateTodos: todoType;
  shiftTodo: (content: string, index: number) => void;
  deleteTodo: (index: number) => void;
};

const TodoList: FC<TodoListProps> = ({
  todoTab,
  currentDateTodos,
  shiftTodo,
  deleteTodo,
}) => {

  if (!currentDateTodos) {
    return (
      <Block>
        <TodoNull />
      </Block>
    );
  }

  const returnTodoItem = (content: string, completed: boolean, index: number) => {
    return (
      <TodoItem
        key={index}
        index={index}
        content={content}
        isCompleted={completed}
        shiftTodo={shiftTodo}
        deleteTodo={deleteTodo} />
    );
  };

  return (
    <Block>
      {
        currentDateTodos.contents.map((it: string, i: number) => {
          const [ head, ...tail ] = it.split('');
          const content = tail.join('');
          const completed = Boolean(Number(head));

          if (todoTab === 'all') {
            return returnTodoItem(content, completed, i);
          }
          if (todoTab === 'completed' && completed) {
            return returnTodoItem(content, completed, i);
          }
          if (todoTab === 'pending' && !completed) {
            return returnTodoItem(content, completed, i);
          }
        })
      }
    </Block>
  );
};

export default TodoList;

const Block = styled.div`
  display: flex;
  height: 60%;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  overflow: auto;
  gap: 10px;
`;