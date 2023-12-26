import React, { FC } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import DateCover from './DateCover';
import { currentMonthTodosType } from 'Hooks/useTodos';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

interface CalendarCreatorProps {
  setTodoTime: React.Dispatch<React.SetStateAction<string>>;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  currentDate: number;
  currentMonthTodos: currentMonthTodosType;
  days: Array<string>;
  dates: Array<number|string>;
};

const CalendarCreator: FC<CalendarCreatorProps> = ({
  setTodoTime,
  currentYear,
  currentMonth,
  currentDay,
  currentDate,
  currentMonthTodos,
  days,
  dates,
}) => {
  const isNowMonth = dayjs().month() === currentMonth;
  currentDate = isNowMonth ? currentDate : -1;

  return (
    <Block>
      <WeekBlock>
        <tr>
          {days.map((ele: string, i: number) =>
            <Day key={i} isToday={isNowMonth && i === currentDay}>{ele}</Day>
          )}
        </tr>
      </WeekBlock>
      <DayBlock>
        {dates.map((d: number|string, i: number) => {
          if (i % 7 === 0) {
            return (
              <tr key={i}>
                {[1, 2, 3, 4, 5, 6, 7].map(n => {
                  const date = dates[i + n];

                  if (!date || typeof date === 'string') {
                    return <td key={i + n} />
                  };

                  const timeKey = dayjs
                    .tz(`${currentYear}-${currentMonth + 1}-${date}`)
                    .format('YYYY-MM-DD');
                    
                  return <DateCover
                    key={i + n}
                    setTodoTime={() => setTodoTime(timeKey)}
                    hasTodo={currentMonthTodos?.hasOwnProperty(timeKey)}
                    isToday={date === currentDate}
                    date={date} />;
                })}
              </tr>
            )
          }
        })}
      </DayBlock>
    </Block>
  );
};

export default CalendarCreator;

const Block = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    user-select: none;
  }
`;

const WeekBlock = styled.thead`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #dedee3;

  tr {
    border-spacing: 5px;
  }
`;

const DayBlock = styled.tbody`

  td {
    font-size: 18px;
    padding: 5px;
    vertical-align: top;
    height: 100px;
    color: #dedee3;
    background-color: #242731;
  }

  td:first-of-type {
    color: #e66641;
  }

  td:last-of-type {
    color: #2576f0;
  }
`;

const Day = styled.td<{ isToday: boolean }>`
  border: 1px solid #2f323b;
  background-color: ${({isToday}) => isToday ? '#6c5dd3' : '#242731'};
  padding: 5px 0;
`;