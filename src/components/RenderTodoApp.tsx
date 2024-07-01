import React, { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GET_USER_KEY } from 'Lib/queryKeys';
import TodoApp from 'Containers/todo/TodoApp';
import LocalTodoApp from 'Containers/todo/LocalTodoApp';

interface RenderTodoAppProps {
  todoTime: string;
};

const RenderTodoApp: FC<RenderTodoAppProps> = ({
  todoTime,
}) => {
  const qc = useQueryClient();
  const userData = qc.getQueryData([GET_USER_KEY]);
  
  return (
    <>
      {userData ?
        <TodoApp
          todoTime={todoTime} /> :
        <LocalTodoApp
          todoTime={todoTime} />}
    </>
  );
};

export default RenderTodoApp;