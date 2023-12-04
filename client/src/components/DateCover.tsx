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
  border: ${({isToday}) => isToday ?
    `2px solid #bf94FF` : `1px solid #2f323b`};
  box-shadow: ${({isToday}) => isToday && 'inset 0 0 7px #bf94FF'};

  &:hover {
    background-color: #2c2f38;
  }

  svg {
    color: #bf94FF;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;