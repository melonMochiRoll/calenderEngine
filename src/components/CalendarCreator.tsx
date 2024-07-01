import React, { FC } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import DateCover from './DateCover';
import { todosListType } from 'Hooks/useTodosList';

interface CalendarCreatorProps {
  setTodoTime: React.Dispatch<React.SetStateAction<string>>;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  currentDate: number;
  todosListData: todosListType;
  days: Array<string>;
  dates: Array<number|string>;
};

const CalendarCreator: FC<CalendarCreatorProps> = ({
  setTodoTime,
  currentYear,
  currentMonth,
  currentDay,
  currentDate,
  todosListData,
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

                  const timeKey =
                    dayjs(`${currentYear}-${currentMonth + 1}-${date}`)
                    .format('YYYY-MM-DD');
                    
                  return <DateCover
                    key={i + n}
                    setTodoTime={() => setTodoTime(timeKey)}
                    partialContents={todosListData[timeKey]?.partialContents}
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

const Day = styled.td<{ isToday: boolean }>`
  border: 1px solid var(--light-gray);
  background-color: ${({isToday}) => isToday ? 'var(--purple)' : 'var(--dark-gray)'};
  padding: 7px 0;
`;