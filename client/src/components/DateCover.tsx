import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';

interface DateCoverProps {
  setCurrentToDo: () => void;
  isToday: boolean;
  date: number;
};

const DateCover: FC<DateCoverProps> = ({
  setCurrentToDo,
  isToday,
  date,
}) => {
  return (
    <Block
      isToday={isToday}
      onClick={setCurrentToDo}>
      {date}
    </Block>
  );
};

export default DateCover;

const Block = styled.td<{ isToday: boolean }>`
  position: relative;
  cursor: pointer;
  background-color: #FFFFFF;
  border: ${({isToday}) => isToday ?
    `2px solid #248E4E` : `1px solid rgba(0, 0, 0, 0.2)`};
  box-shadow: ${({isToday}) => isToday && 'inset 0 0 7px #248E4E'};

  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
  }
`;