import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from 'Hooks/reduxHooks';

interface CalendarTitleProps {};

const CalendarTitle: FC<CalendarTitleProps> = () => {
  const { calendarYear, calendarMonth } = useAppSelector(state => state.calendarTime);

  return (
    <Block>
      <Title>
        {calendarYear}년 {calendarMonth}월
      </Title>
    </Block>
  );
};

export default CalendarTitle;

const Block = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-size: 48px;
  text-align: center;
  font-weight: 800;
  color: var(--white);
  padding: 3px;
  margin: 0;
`;