import React, { FC } from 'react';
import useTodosList from 'Hooks/useTodosList';
import CalendarCreator from './CalendarCreator';
import { useAppSelector } from 'Hooks/reduxHooks';

interface RenderServerCalendarProps {}; 

const RenderServerCalendar: FC<RenderServerCalendarProps> = ({}) => {
  const { calendarTime } = useAppSelector(state => state.calendarTime);
  const [ todosListData ] = useTodosList(calendarTime.format('YYYY-MM-DD'));
  
  return (
    <CalendarCreator
      todosListData={todosListData} />
  );
};

export default RenderServerCalendar;