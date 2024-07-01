import React, { FC } from 'react';
import styled from '@emotion/styled';
import ArrowRightIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowLeftIcon from '@mui/icons-material/ArrowBackRounded';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { setCalendarTime } from 'Features/calendarTimeSlice';

interface ControlPanelProps {
  currentMonth: number;
};

const ControlPanel: FC<ControlPanelProps> = ({
  currentMonth,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Block>
      <ArrowLeftIcon
        sx={{ fontSize: '40px' }}
        onClick={() => dispatch(setCalendarTime(currentMonth - 1))}/>
      <ArrowRightIcon
        sx={{ fontSize: '40px' }}
        onClick={() => dispatch(setCalendarTime(currentMonth + 1))}/>
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