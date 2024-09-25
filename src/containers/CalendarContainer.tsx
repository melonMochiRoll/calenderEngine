import React, { FC } from 'react';
import styled from '@emotion/styled';
import ControlPanel from 'Components/ControlPanel';
import CalendarTitle from 'Components/CalendarTitle';
import SearchBar from 'Components/SearchBar';
import CalendarCreator from 'Components/CalendarCreator';

interface CalendarContainerProps {};

const CalendarContainer: FC<CalendarContainerProps> = ({}) => {
  return (
    <Calendar>
      <CalendarHeader>
        <CalendarTitle />
        <SearchBar />
        <ControlPanel />
      </CalendarHeader>
      <CalendarCreator />
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