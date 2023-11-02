import React, { FC } from 'react';
import styled from '@emotion/styled';
import ControlPanel from 'Components/ControlPanel';
import CalendarTitle from 'Components/CalendarTitle';
import CalendarCreator from 'Components/CalendarCreator';
import { currentMonthTodosType } from 'Hooks/useTodos';
import dayjs from 'dayjs';

interface CalendarContainerProps {
  now: dayjs.Dayjs;
  setNow: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>
  setCurrentTime: React.Dispatch<React.SetStateAction<string>>;
  currentMonthTodos: currentMonthTodosType;
};

const CalendarContainer: FC<CalendarContainerProps> = ({
  now,
  setNow,
  setCurrentTime,
  currentMonthTodos,
}) => {
  const currentYear = now.year();
  const currentMonth = now.month();

  /** 현재 요일 */
  const currentDate = now.date();
  const currentDay = now.day();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayoftheweek = days[currentDay];

  const dates: Array<number|string> = [];
  const firstDay = now.date(1).day();
  const lastDate = now.daysInMonth();

  for (let i=0; i<=firstDay; i++) {
    dates.push(' ');
  }

  for (let i=1; i<=lastDate; i++) {
    dates.push(i);
  }

  return (
    <Block>
      <Calendar>
        <CalendarTitle
          currentYear={currentYear}
          currentMonth={currentMonth} />
        <CalendarCreator
          setCurrentTime={setCurrentTime}
          currentYear={currentYear}
          currentMonth={currentMonth}
          currentDate={currentDate}
          currentMonthTodos={currentMonthTodos}
          dates={dates} />
        <ControlPanel
          setNow={setNow}
          prevMonth={now.month(currentMonth - 1)}
          nextMonth={now.month(currentMonth + 1)} />
      </Calendar>
    </Block>
  );
};

export default CalendarContainer;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  height: 100vh;
  background-color: #F3F5F8;
`;

const Calendar = styled.div`
  width: 800px;
`;