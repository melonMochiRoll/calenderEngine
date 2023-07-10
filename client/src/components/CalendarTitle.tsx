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
  justify-content: center;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 24px;
  text-align: center;
  font-weight: 800;
  background-color: #FFFFFF;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  padding: 3px;
`;