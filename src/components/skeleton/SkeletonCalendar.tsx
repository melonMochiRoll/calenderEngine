import React, { FC } from 'react';
import styled from '@emotion/styled';
import { DAYS } from 'Lib/calendarConstants';
import { Skeleton } from '@mui/material';

const SkeletonCalendar: FC = () => {
  return (
    <Block>
      <WeekBlock>
        <tr>
          {DAYS.map((ele: string, i: number) =>
            <Day key={i + ele}>{ele}</Day>
          )}
        </tr>
      </WeekBlock>
      <DayBlock>
        {
          Array.from({ length: 30 }, (_, i) => i).map((_, i) => {
            if (i % 7 === 0) {
              return (
                <tr key={i}>
                  {[1, 2, 3, 4, 5, 6, 7].map((n, idx) => {          
                    return (
                      <Box key={idx}>
                        <Skeleton sx={{ bgcolor: 'grey.800' }} animation='wave' variant='rectangular' width='100%' height='100%' />
                      </Box>
                    );
                  })}
                </tr>
              )
            }
          })
        }
      </DayBlock>
    </Block>
  );
};

export default SkeletonCalendar;

const Block = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    user-select: none;
  }
`;

const WeekBlock = styled.thead`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: var(--white);

  tr {
    border-spacing: 5px;
  }
`;

const DayBlock = styled.tbody`

  td {
    font-size: 20px;
    padding: 5px;
    vertical-align: top;
    height: 115px;
    color: var(--white);
    background-color: var(--dark-gray);
  }

  td:first-of-type {
    color: #e66641;
  }

  td:last-of-type {
    color: #2576f0;
  }
`;

const Day = styled.td<{ isToday?: boolean }>`
  border: 1px solid var(--light-gray);
  background-color: ${({isToday}) => isToday ? 'var(--purple)' : 'var(--dark-gray)'};
  padding: 7px 0;
`;

const Box = styled.td`
  width: 120px;
`;