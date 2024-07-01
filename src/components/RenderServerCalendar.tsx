import useTodosList from 'Hooks/useTodosList';
import CalendarCreator from './CalendarCreator';
import dayjs from 'dayjs';
import React, { FC } from 'react';

interface RenderServerCalendarProps {
  now: dayjs.Dayjs;
  setTodoTime: React.Dispatch<React.SetStateAction<string>>;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  currentDate: number;
  days: string[];
  dates: (string | number)[];
}; 

const RenderServerCalendar: FC<RenderServerCalendarProps> = ({
  now,
  setTodoTime,
  currentYear,
  currentMonth,
  currentDay,
  currentDate,
  days,
  dates,
}) => {
  const [ todosListData ] = useTodosList(now.format('YYYY-MM-DD'));
  
  return (
    <CalendarCreator
      setTodoTime={setTodoTime}
      currentYear={currentYear}
      currentMonth={currentMonth}
      currentDay={currentDay}
      currentDate={currentDate}
      todosListData={todosListData}
      days={days}
      dates={dates} />
  );
};

export default RenderServerCalendar;