import React, { FC } from 'react';
import TodoApp from 'Containers/todo/TodoApp';
import LocalTodoApp from 'Containers/todo/LocalTodoApp';
import useUser from 'Hooks/useUser';

interface RenderTodoAppProps {};

const RenderTodoApp: FC<RenderTodoAppProps> = ({}) => {
  const [ userData ] = useUser();
  
  return (
    <>
      {userData ?
        <TodoApp /> :
        <LocalTodoApp />}
    </>
  );
};

export default RenderTodoApp;