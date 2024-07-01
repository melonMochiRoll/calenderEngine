import React, { FC } from 'react';
import CalendarCreator from './CalendarCreator';
import dayjs from 'dayjs';
import useLocalTodosList from 'Hooks/useLocalTodosList';

interface RenderLocalCalendarProps {
  now: dayjs.Dayjs,
  setTodoTime: React.Dispatch<React.SetStateAction<string>>;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  currentDate: number;
  days: string[];
  dates: (string | number)[];
}; 

const RenderLocalCalendar: FC<RenderLocalCalendarProps> = ({
  now,
  setTodoTime,
  currentYear,
  currentMonth,
  currentDay,
  currentDate,
  days,
  dates,
}) => {
  const [ todosList ] = useLocalTodosList(now.format('YYYY-MM-DD'));
  
  return (
    <CalendarCreator
      setTodoTime={setTodoTime}
      currentYear={currentYear}
      currentMonth={currentMonth}
      currentDay={currentDay}
      currentDate={currentDate}
      todosListData={todosList}
      days={days}
      dates={dates} />
  );
};

export default RenderLocalCalendar;