import React, { FC } from 'react';
import styled from '@emotion/styled';

interface CalendarTitleProps {
  calendarTime: string;
};

const CalendarTitle: FC<CalendarTitleProps> = ({
  calendarTime,
}) => {
  const [ year, month ] = calendarTime.split('-');

  return (
    <Block>
      <Title>
        {year}년 {month}월
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