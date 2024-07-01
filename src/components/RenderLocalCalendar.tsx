import React, { FC } from 'react';
import CalendarCreator from './CalendarCreator';
import useLocalTodosList from 'Hooks/useLocalTodosList';
import { useAppSelector } from 'Hooks/reduxHooks';

interface RenderLocalCalendarProps {}; 

const RenderLocalCalendar: FC<RenderLocalCalendarProps> = ({}) => {
  const { calendarTime } = useAppSelector(state => state.calendarTime);
  const [ localTodosListData ] = useLocalTodosList(calendarTime.format('YYYY-MM-DD'));
  
  return (
    <CalendarCreator
      todosListData={localTodosListData} />
  );
};

export default RenderLocalCalendar;