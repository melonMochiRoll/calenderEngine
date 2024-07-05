import React, { FC } from 'react';
import styled from '@emotion/styled';
import ArrowRightIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowLeftIcon from '@mui/icons-material/ArrowBackRounded';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { nextMonth, prevMonth } from 'Features/calendarTimeSlice';

const ControlPanel: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Block>
      <ArrowLeftIcon
        sx={{ fontSize: '40px' }}
        onClick={() => dispatch(prevMonth())} />
      <ArrowRightIcon
        sx={{ fontSize: '40px' }}
        onClick={() => dispatch(nextMonth())} />
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