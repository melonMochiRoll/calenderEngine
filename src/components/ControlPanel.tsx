import React, { FC } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import ArrowRightIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowLeftIcon from '@mui/icons-material/ArrowBackRounded';

interface ControlPanelProps {
  prevMonth: dayjs.Dayjs;
  nextMonth: dayjs.Dayjs;
  setNow: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

const ControlPanel: FC<ControlPanelProps> = ({
  setNow,
  prevMonth,
  nextMonth,
}) => {
  return (
    <Block>
      <ArrowLeftIcon
        sx={{ fontSize: '40px' }}
        onClick={() => setNow(prevMonth)}/>
      <ArrowRightIcon
        sx={{ fontSize: '40px' }}
        onClick={() => setNow(nextMonth)}/>
    </Block>
  );
};

export default ControlPanel;

const Block = styled.div`
  display: flex;
  align-items: end;
  padding: 5px 10px;
  gap: 10px;

  svg {
    cursor: pointer;
    border-radius: 8px;
    color: var(--white);
  }

  svg:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;