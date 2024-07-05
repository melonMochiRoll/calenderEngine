import React, { FC } from 'react';
import useTodosList from 'Hooks/useTodosList';
import CalendarCreator from './CalendarCreator';
import { useAppSelector } from 'Hooks/reduxHooks';
import dayjs from 'dayjs';

interface RenderServerCalendarProps {}; 

const RenderServerCalendar: FC<RenderServerCalendarProps> = ({}) => {
  const { calendarTime } = useAppSelector(state => state.calendarTime);
  const [ todosListData ] = useTodosList(dayjs(calendarTime).format('YYYY-MM-DD'));
  
  return (
    <CalendarCreator
      todosListData={todosListData} />
  );
};

export default RenderServerCalendar;