import React, { FC } from 'react';
import styled from '@emotion/styled';
import ControlPanel from 'Components/ControlPanel';
import CalendarCreator from 'Components/CalendarCreator';
import dayjs from 'dayjs';
import CalendarTitle from 'Components/CalendarTitle';
import { todosListType } from 'Hooks/useTodosList';

interface CalendarContainerProps {
  now: dayjs.Dayjs;
  setNow: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>
  setTodoTime: React.Dispatch<React.SetStateAction<string>>;
  todosListData: todosListType;
};

const CalendarContainer: FC<CalendarContainerProps> = ({
  now,
  setNow,
  setTodoTime,
  todosListData,
}) => {
  const currentYear = now.year();
  const currentMonth = now.month();

  /** 현재 요일 */
  const currentDate = now.date();
  const currentDay = now.day();
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

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
    <Calendar>
      <Top>
        <CalendarTitle
          currentYear={currentYear}
          currentMonth={currentMonth} />
        <ControlPanel
          setNow={setNow}
          prevMonth={now.month(currentMonth - 1)}
          nextMonth={now.month(currentMonth + 1)} />
      </Top>
      <CalendarCreator
        setTodoTime={setTodoTime}
        currentYear={currentYear}
        currentMonth={currentMonth}
        currentDay={currentDay}
        currentDate={currentDate}
        todosListData={todosListData}
        days={days}
        dates={dates} />
    </Calendar>
  );
};

export default CalendarContainer;

const Calendar = styled.div`
  width: 100%;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
`;