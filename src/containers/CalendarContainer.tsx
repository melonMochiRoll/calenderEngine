import React, { FC } from 'react';
import styled from '@emotion/styled';
import ControlPanel from 'Components/ControlPanel';
import CalendarTitle from 'Components/CalendarTitle';
import SearchBar from 'Components/SearchBar';
import RenderLocalCalendar from 'Components/RenderLocalCalendar';
import { useQueryClient } from '@tanstack/react-query';
import { GET_USER_KEY } from 'Lib/queryKeys';
import RenderServerCalendar from 'Components/RenderServerCalendar';
import { useAppSelector } from 'Hooks/reduxHooks';

interface CalendarContainerProps {};

const CalendarContainer: FC<CalendarContainerProps> = ({}) => {
  const qc = useQueryClient();
  const userData = qc.getQueryData([GET_USER_KEY]);
  const {
    currentYear,
    currentMonth,
  } = useAppSelector(state => state.calendarTime);

  return (
    <Calendar>
      <CalendarHeader>
        <CalendarTitle
          currentYear={currentYear}
          currentMonth={currentMonth} />
        <SearchBar />
        <ControlPanel />
      </CalendarHeader>
      {userData ?
        <RenderServerCalendar /> :
        <RenderLocalCalendar />}
    </Calendar>
  );
};

export default CalendarContainer;

const Calendar = styled.div`
  width: 100%;
`;

const CalendarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;