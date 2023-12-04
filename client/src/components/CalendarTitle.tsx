import React, { FC } from 'react';
import styled from '@emotion/styled';

interface CalendarTitleProps {
  currentYear: number;
  currentMonth: number;
};

const CalendarTitle: FC<CalendarTitleProps> = ({
  currentYear,
  currentMonth,
}) => {
  return (
    <Block>
      <Title>
        {currentYear}년 {currentMonth + 1}월
      </Title>
    </Block>
  );
};

export default CalendarTitle;

const Block = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-size: 42px;
  text-align: center;
  font-weight: 800;
  color: #efeff1;
  padding: 3px;
`;