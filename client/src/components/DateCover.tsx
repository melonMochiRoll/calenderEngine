import React, { FC } from 'react';
import styled from '@emotion/styled';
import NotiIcon from '@mui/icons-material/Feedback';

interface DateCoverProps {
  setCurrentTime: () => void;
  hasTodo: boolean;
  isToday: boolean;
  date: number;
};

const DateCover: FC<DateCoverProps> = ({
  setCurrentTime,
  hasTodo,
  isToday,
  date,
}) => {
  return (
    <Block
      isToday={isToday}
      onClick={setCurrentTime}>
      <Content>
        {date}
        {hasTodo ? <NotiIcon /> : ''}
      </Content>
    </Block>
  );
};

export default DateCover;

const Block = styled.td<{ isToday: boolean }>`
  width: 120px;
  cursor: pointer;
  background-color: #FFFFFF;
  border: ${({isToday}) => isToday ?
    `2px solid #248E4E` : `1px solid rgba(0, 0, 0, 0.2)`};
  box-shadow: ${({isToday}) => isToday && 'inset 0 0 7px #248E4E'};

  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
  }

  svg {
    color: #248E4E;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;