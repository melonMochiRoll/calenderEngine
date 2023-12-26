import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import CalendarContainer from 'Containers/CalendarContainer';
import TodoContainer from 'Containers/TodoContainer';
import useTodos from 'Hooks/useTodos';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Header from 'Containers/Header';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

const MainPage: FC = () => {
  const [ now, setNow ] = useState(dayjs.tz());
  const [ todoTime, setTodoTime ] = useState('');
  const [ currentMonthTodos, refetch ] = useTodos(now.format('YYYY-MM-DD'));

  return (
    <Block>
      <CalendarBlock>
        <Box>
          <Header />
          <CalendarContainer
            now={now}
            setNow={setNow}
            setTodoTime={setTodoTime}
            currentMonthTodos={currentMonthTodos} />
        </Box>
      </CalendarBlock>
      <TodoContainer
        todoTime={todoTime}
        currentMonthTodos={currentMonthTodos}
        refetch={refetch} />
    </Block>
  );
};

export default MainPage;

const Block = styled.div`
  display: flex;
`;

const CalendarBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  height: 100vh;
  padding: 30px;
  background-color: #1f2128;
`;

const Box = styled.div`
  width: 800px;
`;