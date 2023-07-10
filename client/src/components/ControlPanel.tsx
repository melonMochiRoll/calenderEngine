import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import ArrowRightIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowLeftIcon from '@mui/icons-material/ArrowBackRounded';

interface ControlPanelProps<T> {
  prevMonth: Dayjs;
  nextMonth: Dayjs;
  setNow: React.Dispatch<React.SetStateAction<T>>;
};

const ControlPanel: FC<ControlPanelProps<any>> = ({
  setNow,
  prevMonth,
  nextMonth,
}) => {
  return (
    <Block>
      <ArrowLeftIcon
        fontSize='large'
        onClick={() => {setNow(prevMonth)}}/>
      <ArrowRightIcon
        fontSize='large'
        onClick={() => {setNow(nextMonth)}}/>
    </Block>
  );
};

export default ControlPanel;

const Block = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 5px 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #FFFFFF;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  gap: 10px;

  svg {
    cursor: pointer;
    border-radius: 8px;
    color: #248E4E;
  }

  svg:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;